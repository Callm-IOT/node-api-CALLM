# CALLM - IOT 📡  
  ![Node.js][def] ![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white) ![React](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) 

## 📖 Introducción  
**CALLM-IOT** es un sistema de **timbre digital inteligente** que permite la comunicación en tiempo real entre usuarios y visitantes. Usa **ESP32CAM, sensores PIR, una app en React Native, otra más en Angular, una API en Node.js y MongoDB** para la gestión de datos.  

## 📂 Estructura del Proyecto  
```plaintext
IoT-md/  
└── src/                # Código fuente del proyecto   
    ├── Config/        # Configuración del proyecto  
    ├── Controllers/   # Controladores de la API  
    ├── Db/            # Configuración y conexión a la base de datos  
    ├── Lib/           # Librerías personalizadas  
    ├── Middlewares/   # Middlewares para la API  
    ├── Models/        # Modelos de datos  
    ├── Routes/        # Rutas de la API  
    ├── Swagger/       # Configuración de Swagger  
    ├── Utils/         # Utilidades y funciones auxiliares  
    ├── App.js         # Archivo principal de la aplicación  
    └── SwaggerOptions.js # Configuración de Swagger  
```  

## ⚙️ Tecnologías Utilizadas  


### 💻 **Software**  
| Tecnología | Uso |
|------------|--------------------------------|
| React Native | Aplicación Móvil |
| Node.js + Express | API y Backend |
| MongoDB Atlas | Base de Datos |
| WebSockets | Comunicación en tiempo real |
| JSON Web Tokens (JWT) | Seguridad y autenticación |

## 🚀 Instalación y Configuración  
Para instalar el proyecto, clona el repositorio y ejecuta los siguientes comandos:  
```bash
git clone https://github.com/Callm-IOT/node-api-CALLM.git
cd node-api-CALLM
npm install
touch .env
```

### 📄 Archivo `.env`  
Crea un archivo `.env` en la raíz del proyecto y agrega la siguiente configuración:  
```plaintext
PORT=
MONGO_URI=
DB_NAME=
JWT_SECRET=
JWT_EXPIRATION=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRATION=
SALT_WORK_FACTOR=
```

## 📡 Arquitectura del Sistema  
```lua
ESP32 --- API (Node.js) --- MongoDB
       \                /
        \-- Front en React Native
         \-- Front en Angular
```

## 📑 Equipo de Desarrollo  
| Integrante | GitHub | Rol | Observaciones |
|------------|--------|-----|--------|
| Daniel de Jesús Bravo Godinez | [@Daniel-Bravo](https://github.com/theIcedBlackTea) | Documentación | ✅ Revisado |
| Yáred Amaury Romero Martínez	 | [@Yared-Amaury-Romero](https://github.com/AmauryRomero1285) | Administrador de IoT | ⛔ Pendiente |
| Josúe Atlai Martínez Otero	 | [@Josúe-Atlai-Martínez-Otero](https://github.com/Josue-Martinez-Otero) | Desarrollador Front-End | ✅ Revisado |
| Jesús Antonio Estrada Jimenez		 | [@Jesús-Antonio-Estrada-Jimenez	](https://github.com/antcodernez) | Desarrollador Back-End | ✅ Revisado |

## 📌 Conclusión y Próximos Pasos  
✅ Entender el proyecto  
✅ Instalarlo y configurarlo  
✅ Contribuir al código  


[def]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node-dot-js&logoColor=white