from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Region(db.Model):
    __tablename__ = 'region'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), nullable=False)

class Comuna(db.Model):
    __tablename__ = 'comuna'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'), nullable=False)
    region = db.relationship('Region', backref='comunas')

class Actividad(db.Model):
    __tablename__ = 'actividad'
    id = db.Column(db.Integer, primary_key=True)
    comuna_id = db.Column(db.Integer, db.ForeignKey('comuna.id'), nullable=False)
    sector = db.Column(db.String(100))
    nombre = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    celular = db.Column(db.String(15))
    dia_hora_inicio = db.Column(db.DateTime, nullable=False)
    dia_hora_termino = db.Column(db.DateTime)
    descripcion = db.Column(db.String(500))
    comuna = db.relationship('Comuna')

def actividadttodict(act):
    return {
        'id': act.id,
        'nombre': act.nombre,
        'sector': act.sector,
        'email': act.email,
        'celular': act.celular,
        'dia_hora_inicio': act.dia_hora_inicio.isoformat(),
        'dia_hora_termino': act.dia_hora_termino.isoformat() if act.dia_hora_termino else None,
        'descripcion': act.descripcion,
        'comuna_id': act.comuna_id
    }

class Foto(db.Model):
    __tablename__ = 'foto'
    id = db.Column(db.Integer, primary_key=True)
    ruta_archivo = db.Column(db.String(300), nullable=False)
    nombre_archivo = db.Column(db.String(300), nullable=False)
    actividad_id = db.Column(db.Integer, db.ForeignKey('actividad.id'), nullable=False)

    actividad = db.relationship('Actividad', backref=db.backref('fotos', cascade="all, delete-orphan"))


class ContactarPor(db.Model):
    __tablename__ = 'contactar_por'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.Enum('whatsapp', 'telegram', 'X', 'instagram', 'tiktok', 'otra'), nullable=False)
    identificador = db.Column(db.String(150), nullable=False)
    actividad_id = db.Column(db.Integer, db.ForeignKey('actividad.id'), nullable=False)

    actividad = db.relationship('Actividad', backref=db.backref('medios_contacto', cascade="all, delete-orphan"))


class ActividadTema(db.Model):
    __tablename__ = 'actividad_tema'
    id = db.Column(db.Integer, primary_key=True)
    tema = db.Column(db.Enum('música', 'deporte', 'ciencias', 'religión', 'política', 'tecnología', 'juegos', 'baile', 'comida', 'otro'), nullable=False)
    glosa_otro = db.Column(db.String(15), nullable=True)
    actividad_id = db.Column(db.Integer, db.ForeignKey('actividad.id'), nullable=False)

    actividad = db.relationship('Actividad', backref=db.backref('temas', cascade="all, delete-orphan"))