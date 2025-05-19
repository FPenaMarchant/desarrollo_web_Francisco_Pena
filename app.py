from flask import Flask, render_template, request, redirect, url_for, flash
from models import db, Actividad, Comuna, ActividadTema, Region, Foto, ContactarPor, actividadttodict
from datetime import datetime
import os
from werkzeug.utils import secure_filename
from flask import jsonify
from validar2 import validar_formulario
from datetime import datetime, timedelta

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static', 'imgs')

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:&dDBWP6#afn89G@localhost/tarea2?charset=utf8mb4&use_unicode=1'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://cc5002:programacionweb@localhost:3306/tarea2?charset=utf8mb4&use_unicode=1'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'connect_args': {
        'use_unicode': True,
        'charset': 'utf8mb4'
    }
}

## upload this to an .env ?????? <- Why? teach's gonna need to access this anyway... 
app.secret_key = 'your_secret_key'

db.init_app(app)

@app.route('/')
def home():
    actividades = (
        db.session.query(Actividad)
        .order_by(Actividad.dia_hora_inicio.desc())
        .limit(5)
        .all()
    )
    fotos_act_dict= {actividad.id: db.session.query(Foto.nombre_archivo, Foto.actividad_id).where(Foto.actividad_id == actividad.id).all() for actividad in actividades}
    temas_act_dict= {actividad.id: db.session.query(ActividadTema.tema, ActividadTema.glosa_otro).where(ActividadTema.actividad_id == actividad.id).all() for actividad in actividades}
    return render_template('home2.html', actividades=actividades, fotos=fotos_act_dict, temas=temas_act_dict)

@app.route('/agregar', methods=['GET', 'POST'])
def agregar_actividad():
    regiones = Region.query.order_by(Region.nombre).all()
    comunas = Comuna.query.order_by(Comuna.nombre).all()
    default_start = datetime.now().strftime('%Y-%m-%dT%H:%M')
    default_end = (datetime.now() + timedelta(hours=1)).strftime('%Y-%m-%dT%H:%M')

    if request.method == 'POST':
        errors= validar_formulario(request.form, request.files)
        for error in errors:
            flash(error, "danger")
        
        if len(errors) > 1:
            return render_template(
            "agregar2.html",
            regiones=regiones,
            comunas=comunas,
            default_start = default_start,
            default_end = default_end,
            form_data=request.form
            )

        comuna_id = request.form.get('comuna_id')
        comuna = Comuna.query.get(comuna_id)

        if not comuna:
            flash("Comuna seleccionada no es válida.", "danger")
            return render_template(
                "agregar2.html",
                regiones=regiones,
                comunas=comunas,
                form_data=request.form
            )

        actividad = Actividad(
            comuna_id=comuna.id if comuna else None,
            sector=request.form.get('Sector'),
            nombre=request.form.get('Nombre'),
            email=request.form.get('Email'),
            celular=request.form.get('Número de celular'),
            dia_hora_inicio=datetime.fromisoformat(request.form.get('Día hora de inicio')),
            dia_hora_termino=datetime.fromisoformat(request.form.get('Día hora de término')),
            descripcion=request.form.get('input_comentario')
        )
        db.session.add(actividad)
        db.session.flush()

        # 1.
        temas = request.form.getlist('tema')
        glosa_otro = request.form.get('otro-tema')
        for tema in temas:
            glosa = glosa_otro if tema == 'otro' else None
            db.session.add(ActividadTema(actividad_id=actividad.id, tema=tema, glosa_otro=glosa))

        medio_contacto = request.form.get("Medio de contacto")
        detalle_contacto = request.form.get("contact_detail")

        if medio_contacto and detalle_contacto:
            db.session.add(ContactarPor(
                nombre=medio_contacto,
                identificador=detalle_contacto,
                actividad_id=actividad.id
            ))

        for i in range(1, 6):
            image = request.files.get(f'image{i}')
            if image and image.filename:
                filename = secure_filename(f"{actividad.id}_{i}.png")
                image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                image.save(image_path)
                db.session.add(Foto(
                    ruta_archivo=image_path,
                    nombre_archivo=filename,
                    actividad_id=actividad.id
                ))

        db.session.commit()
        flash("Actividad agregada con éxito.")
        return redirect(url_for('home'))

    return render_template("agregar2.html", regiones=regiones, comunas=comunas, form_data=[])

@app.route('/listado')
def listado_actividades():
    actividades = (
        db.session.query(Actividad)
        .order_by(Actividad.dia_hora_inicio.desc())
        .all()
    )
    act_dict= [actividadttodict(a) for a in actividades]
    fotos_act_dict= {actividad.id: [{'nombre_archivo': nombre_archivo, 'actividad_id': actividad_id} for (nombre_archivo, actividad_id) in 
                                    db.session.query(Foto.nombre_archivo, Foto.actividad_id).where(Foto.actividad_id == actividad.id).filter(Foto.actividad_id == actividad.id).all()]
                                    for actividad in actividades}
    temas_act_dict= {actividad.id: [{'actividad_tema': actividad_tema, 'actividad_glosaotro': actividad_glosaotro} for (actividad_tema, actividad_glosaotro) in 
                                    db.session.query(ActividadTema.tema, ActividadTema.glosa_otro).filter(ActividadTema.actividad_id == actividad.id).all()] 
                                    for actividad in actividades}
    comunas_dict= {actividad.comuna.id: actividad.comuna.nombre for actividad in actividades}
    return render_template("listado2.html", actividades=act_dict, fotos= fotos_act_dict, temas= temas_act_dict, comunas= comunas_dict)

@app.route('/estadisticas')
def estadisticas():
    return render_template("estadisticas.html")

@app.route('/api/comunas/<int:region_id>')
def comunas_por_region(region_id):
    comunas = Comuna.query.filter_by(region_id=region_id).order_by(Comuna.nombre).all()
    result = [
        {'id': comuna.id, 'nombre': comuna.nombre}
        for comuna in comunas
    ]
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)