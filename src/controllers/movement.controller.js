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
    const { type, cashbox, user, description, comition } = req.query;

    if (!cashbox) {
      return res.status(400).json({ message: "cashbox is required" });
    }

    const content = await Movements.findAll(
      {
      where: {
        status: 1,
        id_cashbox: cashbox,
        ...(type && { type }),
        ...(description && { description }),
        ...(comition && { comition })
      },
        include: [
          {
            model: models.MovementData,
            where: {
              ...(user && { id_user: user })
            },
            include: [
              {
                model: models.Users,
                field: ["name"]
              }
            ]
        }],
        order: [
          ['date', 'DESC']
        ]
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
          include: [
            {
              model: models.Users,
              field: ["name"]
            }
          ]
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
    const { Movements, MovementData, Users } = models;
    const { id_cashbox, id_user, type, quantity, description, comition, date } = req.body;

    if (!id_cashbox) return res.status(400).json({ message: "id_cashbox is required" });

    const cashbox = await models.Cashbox.findByPk(id_cashbox);
    if (cashbox.state === "CLOSED") return res.status(404).json({ message: "Cashbox is closed" });

    const content = await Movements.create({
      id_cashbox,
      type,
      quantity,
      description,
      comition,
      date,
      status: 1
    });

    const contentData = await MovementData.create({
      id_user,
      id_movement: content.id_movement,
      status: 1
    });

    const movementWithUser = await Movements.findByPk(content.id_movement, {
      include: [
        {
          model: MovementData,
          include: [
            { model: Users, attributes: ["name"] }
          ]
        }
      ]
    });

    res.json(movementWithUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const edit = async (req, res) => {
  try {
    const { Movements, MovementData, Users } = models;
    const { id } = req.params;
    const { id_user, type, quantity, description, comition, date } = req.body;

    const movement = await Movements.findByPk(id);
    if (!movement) return res.status(404).json({ message: "Movement not found" });

    await Movements.update(
      { type, quantity, description, comition, date, status: 1 },
      { where: { id_movement: id } }
    );

    await MovementData.update(
      { id_user, status: 1 },
      { where: { id_movement: id } }
    );

    const movementWithUser = await Movements.findByPk(id, {
      include: [
        {
          model: MovementData,
          include: [
            { model: Users, attributes: ["name"] }
          ]
        }
      ]
    });

    res.json(movementWithUser);
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