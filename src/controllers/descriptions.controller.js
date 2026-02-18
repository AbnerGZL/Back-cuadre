import { where } from "sequelize";
import bcrypt from "bcryptjs";
import { models } from "../models/index.js";
import { text } from "express";
/**
 * This object contains controller functions for managing descriptions operations.
 * @module controllers/descriptions.controller.js
 * @requires models - Models for database interaction.
 * @requires express - Express framework for handling HTTP requests and responses.
 */

const list = async (req, res) => {
  try {
    const { Descriptions } = models;
    const { place } = req.query;

    const content = await Descriptions.findAll({
      where: place ? { id_place: place } : undefined,
      order: [["text", "ASC"]],
    });

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOne = async (req, res) => {
  try {
    const { Descriptions } = models;
    const { id, text } = req.query;
    const content = await Descriptions.findOne({
      where: {
        ...(id && { id_description: id }),
        ...(text && { text })
      },
    });

    if (!content || content.length === 0) {
      return res.json({ message: "Not found description" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const create = async (req, res) => {
  try {
    const { Descriptions } = models;
    const body = {
      id_place: req.body.id_place,
      text: req.body.text,
      link: 0
    }
    const content = await Descriptions.create(body);

    if (!content) {
      return res.json({ message: "Error creating description" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const edit = async (req, res) => {
  try {
    const { Descriptions } = models;
    const { id } = req.params;

    const id_description = await Descriptions.findByPk(id);
    if (!id_description) {
      return res.status(404).json({ message: "description not found" });
    }

    const body = {
      text: req.body.text,
      link: req.body.link
    }

    await Descriptions.update(body, {
      where: { id_description: id }
    });

    const description = await Descriptions.findByPk(id);
    res.json(description);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteDescription = async (req, res) => {
  try {
    const { Descriptions } = models;
    const { id } = req.params;

    const tag = await Descriptions.findByPk(id);

    if (!tag) {
      return res.status(404).json({ message: "Description not found" });
    }

    if (tag.link > 0) {
      return res.status(400).json({
        message: "Cannot delete tag because it is already used in movements",
      });
    }

    await tag.destroy();

    res.json({ message: "Description deleted" });
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
  delete: deleteDescription
};