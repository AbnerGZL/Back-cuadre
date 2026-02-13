import { where } from "sequelize";
import bcrypt from "bcryptjs";
import { models } from "../models/index.js";
/**
 * This object contains controller functions for managing movements operations.
 * @module controllers/movement.controller.js
 * @requires models - Models for database interaction.
 * @requires express - Express framework for handling HTTP requests and responses.
 */

const list = async (req, res) => {
  try {
    const { Movements } = models;
    const content = await Movements.findAll(
      {
        include: [
          {
            model: models.MovementData,
        }]        
      }
    );

    if (!content || content.length === 0) {
      return res.json({ message: "Not found movements" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getForId = async (req, res) => {
  try {
    const { Movements } = models;
    const content = await Movements.findAll({
      where: { id_movement: req.params.id },
      include: [
        {
          model: models.MovementData,
      }]
    });

    if (!content || content.length === 0) {
      return res.json({ message: "Not found movement" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const create = async (req, res) => {
  try {
    const { Movements } = models;
    const { MovementData } = models;
    const bodyMovement = {
        type: req.body.type,
        quantity: req.body.quantity,
        description: req.body.description,
        commition: req.body.commition,
        date: req.body.date
    }
    const content = await Movements.create(bodyMovement);

    const bodyData = {
        id_user: req.body.id_user,
        id_movement: content.id_movement,
        id_agents: req.body.id_agents,
        id_floor: req.body.id_floor,
    }        
    const contentData = await MovementData.create(bodyData);

    res.json({ movement: content, data: contentData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const edit = async (req, res) => {
  try {
    const { Movements, MovementData } = models;
    const { id } = req.params;
    
    const id_movement = await Movements.findByPk(id);
    if (!id_movement) {
      return res.status(404).json({ message: "Movement not found" });
    }

    const body = {
        type: req.body.type,
        quantity: req.body.quantity,
        description: req.body.description,
        commition: req.body.commition,
        date: req.body.date
    }

    const bodyData = {
        id_user: req.body.id_user,
        id_movement: id,
        id_agents: req.body.id_agents,
        id_floor: req.body.id_floor,
    }        
    await MovementData.update(bodyData, {
      where: { id_movement: id }
    });
    await Movements.update(body, {
      where: { id_movement: id }
    });
    const movement = await Movements.findByPk(id, {
      include: [
        {
          model: models.MovementData,
      }]
    });
    res.json(movement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteMovement = async (req, res) => {
  try {
    const { Movements, MovementData } = models;
    const { id } = req.params;
    await MovementData.destroy({
      where: { id_movement: id }
    });    
    const content = await Movements.destroy({
      where: { id_movement: id }
    });
    res.json(content? { message: "Movement deleted" } : { message: "Movement not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  list,
  getForId,
  create,
  edit,
  delete: deleteMovement
};