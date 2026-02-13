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
    const { Cashbox } = models;
    const content = await Cashbox.findAll();

    if (!content || content.length === 0) {
      return res.json({ message: "Not found cashbox" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOne = async (req, res) => {
  try {
    const { Cashbox } = models;
    const { date, value, id } = req.query;
    const content = await Cashbox.findAll({
      where: {
        ...(id && { id_cashbox: id }),
        ...(date && { date }),
        ...(value && { value })
      }
    });

    if (!content || content.length === 0) {
      return res.json({ message: "Not found cashbox" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const create = async (req, res) => {
  try {
    const { Cashbox } = models;
    const body = {
        id_place: req.body.id_place,
        status: req.body.status,
        date: req.body.date,
        value: req.body.value,
        quantity: req.body.quantity
    }
    const content = await Cashbox.create(body);

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const edit = async (req, res) => {
  try {
    const { Cashbox } = models;
    const { id } = req.params;

    const existingCashbox = await Cashbox.findByPk(id);
    if (!existingCashbox) {
      return res.json({ message: "Not found cashbox" });
    }
    const body = {
        id_place: req.body.id_place,
        status: req.body.status,
        date: req.body.date,
        value: req.body.value,
        quantity: req.body.quantity
    }
    const content = await Cashbox.update(body, {
      where: { id_cashbox: id }
    });
    if (content[0] === 0) {
      return res.json({ message: "No changes made to cashbox" });
    }

    const cashbox = await Cashbox.findByPk(id);
    res.json(cashbox);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCashbox = async (req, res) => {
  try {
    const { Cashbox } = models;
    const { id } = req.params;
    const content = await Cashbox.destroy({
      where: { id_cashbox: id }
    });
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  list,
  getOne,
  create,
  edit,
  delete: deleteCashbox
};