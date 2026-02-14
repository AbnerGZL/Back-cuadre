import { where } from "sequelize";
import bcrypt from "bcryptjs";
import { models } from "../models/index.js";
/**
 * This object contains controller functions for managing cashbox operations.
 * @module controllers/cashbox.controller.js
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
    const { date, id, state } = req.query;
    const content = await Cashbox.findOne({
      where: {
        status: 1,
        date: date,
        ...(id && { id_cashbox: id }),
        ...(state && { state })
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
        date: new Date().toISOString().split('T')[0],
        state: "OPEN",
        status: 1
    }
    const content = await Cashbox.create(body);

    if (!content) {
      return res.json({ message: "Error creating cashbox" });
    }

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
        date: req.body.date,
        state: req.body.state
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
    const content = await Cashbox.update({
      status: 0
    }, {
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