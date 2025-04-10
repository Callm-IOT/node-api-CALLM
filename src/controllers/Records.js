import RecordsDoor from "../models/RecordsDoor.js"; // ajusta la ruta si es necesario

// Crear un nuevo registro
export const createRecord = async (req, res) => {
  try {
    const { isOpen } = req.body;

    const newRecord = new RecordsDoor({ isOpen });
    await newRecord.save();

    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el registro", error });
  }
};

// Obtener todos los registros
export const getAllRecords = async (req, res) => {
  try {
    const records = await RecordsDoor.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los registros", error });
  }
};

// Obtener un registro por ID
export const getRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await RecordsDoor.findById(id);

    if (!record) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el registro", error });
  }
};

// Actualizar un registro por ID
export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { isOpen } = req.body;

    const updatedRecord = await RecordsDoor.findByIdAndUpdate(
      id,
      { isOpen },
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el registro", error });
  }
};

// Eliminar un registro por ID
export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecord = await RecordsDoor.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.status(200).json({ message: "Registro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el registro", error });
  }
};
