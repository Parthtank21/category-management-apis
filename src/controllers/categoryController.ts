import { Request, Response } from "express";
import Category from "../models/categoryModel";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, parent } = req.body;
    const category = new Category({ name, parent });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    const categoryMap: Record<string, any> = {};
    categories.forEach(
      (cat) =>
        (categoryMap[cat._id.toString()] = { ...cat.toObject(), children: [] })
    );

    const rootCategories: any[] = [];
    categories.forEach((cat) => {
      if (cat.parent) {
        categoryMap[cat.parent.toString()].children.push(
          categoryMap[cat._id.toString()]
        );
      } else {
        rootCategories.push(categoryMap[cat._id.toString()]);
      }
    });

    res.json(rootCategories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name, status } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, status },
      { new: true }
    );

    if (!updatedCategory) {
      res.status(404).json({ error: "Category not found" });
      return;
    }
    if (status === "inactive") {
      await Category.updateMany(
        { parent: updatedCategory._id },
        { status: "inactive" }
      );
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    // Reassign children to the parent
    await Category.updateMany(
      { parent: category._id },
      { parent: category.parent }
    );

    // Delete the category
    await category.deleteOne();

    res.json({ message: "Category deleted and children reassigned" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
