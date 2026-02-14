import { where } from "sequelize";
import bcrypt from "bcryptjs";
import { models } from "../models/index.js";
/**
 * This object contains controller functions for managing agents operations.
 * @module controllers/agents.controller.js
 * @requires models - Models for database interaction.
 * @requires express - Express framework for handling HTTP requests and responses.
 */

const list = async (req, res) => {
  try {
    const { Agents } = models;
    const { cashbox } = req.query;
    const content = await Agents.findAll();

    if (!content || content.length === 0) {
      return res.json({ message: "Not found agents records" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOne = async (req, res) => {
  try {
    const { Agents } = models;
    const { id } = req.query;
    const content = await Agents.findOne({
      where: { 
        status: 1,
        id_agents: id,
    },
    });

    if (!content || content.length === 0) {
      return res.json({ message: "Not found agent record" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const create = async (req, res) => {
  try {
    const { Agents } = models;
    const body= {
        name: req.body.name,
        status: 1
    }
    const content = await Agents.create(body);

    if (!content) {
        return res.json({ message: "Error creating agent record" });
    }

    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const edit = async (req, res) => {
  try {
    const { Agents } = models;
    const { id } = req.params;
    
    const id_agent = await Agents.findByPk(id);
    if (!id_agent) {
      return res.status(404).json({ message: "agent not found" });
    }

    const body = {
        name: req.body.name,
        status: 1
    }

    await Agents.update(body, {
      where: { id_agents: id }
    });

    const agent = await Agents.findByPk(id);
    res.json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteAgent= async (req, res) => {
  try {
    const { Agents } = models;
    const { id } = req.params;
    await Agents.update({
      status: 0
    }, {
      where: { id_agents: id }
    });
    res.json({ message: "Agent deleted" });
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
  delete: deleteAgent
};