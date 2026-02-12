// import Salary from "../models/Salary.model";
// import { Request, Response } from "express";

// export const salaryCredited = async (req: Request, res: Response) => {
//     try{
//         const userId = (req as any).user.id;
//         const salary = await Salary.findOne({ userId });
//         if (!salary) {
//             return res.status(404).json({ message: "Salary not found" });
//         }
//         salary.isCredited = true;
//         await salary.save();
//         res.json({ message: "Salary marked as credited" });
//     } catch (error) {
//         res.status(500).json({ message: "Error marking salary as credited", error });
//     }
// }