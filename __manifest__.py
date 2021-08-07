{
    'name': 'Camera face recognitions',
    'version': '13.0.0.0',
    'summary': '',
    'description': '',
    'category': '',
    'author': '',
    'website': '',
    'license': '',
    'depends': ['base', 'hr_attendance'],
    'data': [
        'views/assets.xml',
        'views/camera_views.xml',
    ],
    'qweb': [
      'static/src/xml/camera_template.xml'
    ],
    'installable': True,
    'auto_install': False,
    'external_dependencies': {
        'python': [],
    }
}