import mongoose from "mongoose";
import { Domain } from "../models/schema.js";

const addDomain = async (req, res) => {
  try {
    const { name, durationInMonths, defaultTasks } = req.body;
    if (!name || !durationInMonths) {
      return res
        .status(400)
        .json({ message: "Name and durationInMonths are required" });
    }
    const domainExists = await Domain.findOne({ name: name });
    if (domainExists) {
      return res.status(400).json({ message: "Domain already exists" });
    }
    const newDomain = new Domain({ name, durationInMonths, defaultTasks });
    newDomain.save();
    res.status(201).json({
      message: "Domain added successfully",
      domain: {
        id: newDomain._id,
        name: newDomain.name,
        durationInMonths: newDomain.durationInMonths,
        defaultTasks: newDomain.defaultTasks,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "addDomain : Server error from controller" + err.message,
    });
  }
};




const getAllDomains = async (req, res) => {
  try{
    const domains = await Domain.find();
    if(domains.length === 0){
      return res.status(404).json({message: "No domains found"});
    } 
    res.status(200).json({
      message: "All Domains fetched successfully",
      domains: domains,
      
    });

  }
  catch(err){
    res.status(500).json({
      message: "getAllDomains : Server error from controller" + err.message,
    });
  }
};





const updateDomain = async (req, res) => {

  try{
    const domainId = req.params.id;

    const { name, durationInMonths, defaultTasks } = req.body;
    const updatedDomain = await Domain.findByIdAndUpdate(
      domainId,
      { name, durationInMonths, defaultTasks },
      { new: true ,runValidators: true }
      
    );
    if(!updatedDomain){
      return res.status(404).json({message: "Domain not found"});
    }
    res.status(200).json({
      message: "Domain updated successfully",
      domain: updatedDomain,
    });

  }
  catch(err){
    res.status(500).json({
      message: "updateDomain : Server error from controller " + err.message,
    });
  }
};



const deleteDomain = async (req, res) => {
  try{
     const domainId = req.params.id;
     const deleteDomain = await Domain.findByIdAndDelete(
      domainId

     )
     if(!deleteDomain){
      return res.status(404).json({message: "Domain not found"});
    }
    res.status(200).json({
      message: "Domain deleted successfully",
      domain: deleteDomain,
    });

  }
  catch(err){
    res.status(500).json({
      message: "DeleteDomain : Server error from controller " + err.message,
    });
  }
};

export { addDomain, getAllDomains, updateDomain, deleteDomain };
