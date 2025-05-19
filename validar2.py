from datetime import datetime
from flask import flash
from models import Comuna, Region

def validar_formulario(form, files):
    errors = []

    region_id = form.get('region_id')
    comuna_id = form.get('comuna_id')
    nombre = form.get('Nombre', '').strip()
    email = form.get('Email', '').strip()
    celular = form.get('Número de celular', '').strip()
    medio_contacto = form.get('Medio de contacto', '').strip()
    detalle_contacto = form.get('contact_detail', '').strip()
    tema = form.get('tema', '')
    otro_tema = form.get('otro-tema', '').strip()

    if not region_id or not Region.query.get(region_id):
        errors.append("Debe seleccionar una región válida.")

    if not comuna_id or not Comuna.query.get(comuna_id):
        errors.append("Debe seleccionar una comuna válida.")

    if not nombre:
        errors.append("El nombre es obligatorio.")

    if email:
        import re
        email_regex = r'^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
        if not re.match(email_regex, email):
            errors.append("El correo tiene un formato inválido.")

    if celular:
        cellphone_regex = r'^\+\d{3}\.\d{8}$'
        if not re.match(cellphone_regex, celular):
            errors.append("El número de celular debe tener el formato +XXX.XXXXXXXX")

    temas = form.getlist('tema')
    otro_tema = form.get('otro-tema', '').strip()

    if not temas:
        errors.append("Debe seleccionar al menos un tema.")

    for tema in temas:
        if tema == "otro":
            if len(otro_tema) < 3 or len(otro_tema) > 5:
                errors.append("El tema personalizado debe tener entre 3 y 5 caracteres.")

    medio_contacto = form.get("Medio de contacto")
    if medio_contacto:
        if len(detalle_contacto) < 3 or len(detalle_contacto) > 15:
            errors.append("El detalle del contacto debe tener entre 3 y 15 caracteres.")
    
    detalle_contacto = form.get("contact_detail")
    if detalle_contacto:
        if len(detalle_contacto) < 3 or len(detalle_contacto) > 15:
            errors.append(f"El identificador de contacto para {medio_contacto} debe tener entre 3 y 15 caracteres.")

    hay_imagen = any(
        files.get(f'image{i}') and files.get(f'image{i}').filename
        for i in range(1, 6)
    )
    if not hay_imagen:
        errors.append("Debe seleccionar al menos una imagen.")

    return errors
