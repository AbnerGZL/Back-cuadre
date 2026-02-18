import { where } from "sequelize";
import bcrypt from "bcryptjs";
import { models } from "../models/index.js";
/**
 * This object contains controller functions for managing accounting operations.
 * @module controllers/accounting.controller.js
 * @requires models - Models for database interaction.
 * @requires express - Express framework for handling HTTP requests and responses.
 */

const list = async (req, res) => {
  try {
    const { Accounting } = models;
    const { cashbox } = req.query;
    const content = await Accounting.findAll(
      {
      where: {
        status: 1,
        id_cashbox: cashbox,
      },
      }
    );

    if (!content || content.length === 0) {
      return res.json({ message: "Not found accounting records" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOne = async (req, res) => {
  try {
    const { Accounting } = models;
    const { id, cashbox, value } = req.query;
    const content = await Accounting.findOne({
      where: { 
        status: 1,
        ...(cashbox && { id_cashbox: cashbox }),
        ...(id && { id_accounting: id }),
        ...(value && { value })
    },
    });

    if (!content || content.length === 0) {
      return res.json({ message: "Not found accounting record" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const create = async (req, res) => {
  try {
    const { Accounting } = models;
    const body= {
        id_cashbox: req.body.id_cashbox,
        type: req.body.type,
        time: new Date().toTimeString().split(' ')[0],
        value: req.body.value,
        quantity: req.body.quantity,
        status: 1
    }
    const content = await Accounting.create(body);

    if (!content) {
        return res.json({ message: "Error creating accounting record" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const edit = async (req, res) => {
  try {
    const { Accounting } = models;
    const { id } = req.params;
    
    const id_accounting = await Accounting.findByPk(id);
    if (!id_accounting) {
      return res.status(404).json({ message: "accounting not found" });
    }

    const body = {
        id_cashbox: req.body.id_cashbox,
        type: req.body.type,
        time: new Date().toTimeString().split(' ')[0],
        value: req.body.value,
        quantity: req.body.quantity,
        status: 1
    }

    await Accounting.update(body, {
      where: { id_accounting: id }
    });

    const movement = await Accounting.findByPk(id);
    res.json(movement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAccounting= async (req, res) => {
  try {
    const { Accounting } = models;
    const { id } = req.params;
    await Accounting.destroy({
      where: { id_accounting: id }
    });
    res.json({ message: "Accounting deleted" });
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
  delete: deleteAccounting
};