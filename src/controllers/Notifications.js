import { errorHandler } from "../middlewares/Error.js";
import Notifications from "../models/Notifications.js";

// Obtener todas las notificaciones
export const getAllUserNotifications = async (req, res) => {
  try {
    const { id } = res.locals.user
    const notifications = await Notifications.find({ userId: id, isRead: false }).lean();

    console.log(notifications);
    
    if (notifications.lenght === 0) {
      res.status(200).json({
        message: "No tienes notificaciones sin leer"
      })
      return;
    }
    res.json(notifications);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Crear una nueva notificación
export const createNotification = async (req, res) => {
  const { userId, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newNotification = new Notifications({
      userId,
      description,
      imageUrl
    });

    await newNotification.save();
    res.status(201).json({
      message: "La notificación fue creada exitosamente",
      data: newNotification
    });
  } catch (error) {
    errorHandler(error, req, res);
  }
};


// Marcar notificación como leída
export const markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notifications.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    res.json(notification);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// Eliminar una notificación
export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notifications.findByIdAndUpdate(id, { enabled: false });

    if (!notification) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    res.json({ message: "Notificación eliminada correctamente" });
  } catch (error) {
    errorHandler(error, req, res);
  }
};
