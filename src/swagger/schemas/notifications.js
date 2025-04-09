export const NOTIFICATIONS = {
    Notifications: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          description: 'El identificador único de la notificación.'
        },
        userId: {
          type: 'string',
          description: 'Id ddel usuario ligado a la notificación.'
        },
        description: {
          type: 'string',
          description: 'Información adicional'
        },
        isRead: {
          type: 'boolean',
          description: 'Indica si la notificación ya fue leída.'
        },
        imageUrl: {
          type: 'string',
          description: 'URL De la imagen ligada a la notificación'
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'La dirección de correo electrónico del usuario.'
        },
        username: {
          type: 'string',
          description: 'El nombre de usuario.'
        },
        role: {
          type: 'string',
          enum: ['Admin', 'User'],
          description: 'El rol del usuario en el sistema.'
        },
        enabled: {
          type: 'boolean',
          description: 'Indica si el usuario está habilitado o no.'
        },
        createdAt: {
          type: 'string',
          format: 'date-time',
          description: 'Fecha y hora cuando el usuario fue creado.'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time',
          description: 'Fecha y hora de la última actualización del usuario.'
        },
        fullName: {
          type: 'string',
          description: 'Nombre completo del usuario.'
        }
      }
    }
  }