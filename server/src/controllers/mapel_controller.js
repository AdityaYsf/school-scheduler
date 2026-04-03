import * as mapelService from "../services/mapel_services.js";

export async function getAll(req, res, next) {
  try {
    const result = await mapelService.listMapel({
      search: req.query.search,
      level: req.query.level,
      status: req.query.status,
    });
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
}

export async function getById(req, res, next) {
  try {
    const mapel = await mapelService.getMapelById(req.params.id);
    if (!mapel) {
      return res.status(404).json({ error: "Mapel tidak ditemukan" });
    }
    res.json({ data: mapel });
  } catch (error) {
    next(error);
  }
}

export async function create(req, res, next) {
  try {
    const mapel = await mapelService.createMapel(req.body);
    res.status(201).json({ data: mapel });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message, details: error.details || [] });
    }
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    const mapel = await mapelService.updateMapel(req.params.id, req.body);
    res.json({ data: mapel });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message, details: error.details || [] });
    }
    next(error);
  }
}

export async function remove(req, res, next) {
  try {
    await mapelService.deleteMapel(req.params.id);
    res.json({ message: "Mapel berhasil dihapus" });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }
    next(error);
  }
}

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
