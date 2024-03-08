import mongoose from "mongoose";
import { employeeSchema } from "./employee.schema.js";

const EmployeeModel = mongoose.model('employee',employeeSchema);

export default class EmployeeRepository {

    async addEmployee(name,email,password,assignedEmployeeId,admin) {
        try {
            const employee = new EmployeeModel({name,email,password,assignedEmployeeId,admin});
            await employee.save();
            return {success:true,res:employee};
        } catch (err) {
            return {success:false,error:{statusCode: 400,msg:err}}
        }
    } 

    async verifyEmployee({email,password}) {
        try {
            const employee = await EmployeeModel.findOne({email}).select("+password");
            if(!employee) {
                return {success:false,error:{statusCode: 404,msg:"Invalid email"}}
            }

            const passwordMatch = await employee.comparePassword(password);
            if(!passwordMatch) {
                return {success:false,error:{statusCode: 404,msg:"Invalid Password"}}
            }

            return {success:true,res:employee};
        } catch (err) {
            return {success:false,error:{statusCode: 400,msg:err}}
        }
    }

    async removeEmployee(assignedEmployeeId) {
        try {
            const employee = await EmployeeModel.findOneAndDelete({assignedEmployeeId});
            if(!employee) {
                return {success:false,error:{statusCode: 404,msg:"Employee not found"}}
            }
            return {success:true,res:employee};
        } catch (err) {
            return {success:false,error:{statusCode: 400,msg:err}}
        }
    }

    async updateEmployee(assignedEmployeeId,updates) {
        try {
            console.log(updates);
            const employee = await EmployeeModel.findOneAndUpdate({assignedEmployeeId},{...updates},{returnDocument:'after'});
            console.log(employee);
            return {success:true,res:employee};
        } catch (err) {
            return {success:false,error:{statusCode: 400,msg:err}}
        }
    } 

    async getAllEmployees() {
        try {
            const employees = await EmployeeModel.find({}).limit(25);
            return {success:true,res:employees};
        } catch (err) {
            return {success:false,error:{statusCode: 400,msg:err}}
        }
    }

    async getEmployee(assignedEmployeeId) {
        try {
            const employee = await EmployeeModel.findOne({assignedEmployeeId});
            return {success:true,res:employee};
        } catch (err) {
            return {success:false,error:{statusCode: 400,msg:err}}
        }
    }

    async addEmployeeToReview(assignedEmployeeId,reviewerId) {
        try {
            console.log({assignedEmployeeId,reviewerId})
            const employee = await EmployeeModel.findOne({assignedEmployeeId});
            if(!employee) {
                return {success:false,error:{statusCode: 404,msg:"Employee not found"}}
            }
            const reviewer = await EmployeeModel.findOne({assignedEmployeeId:reviewerId});
            if(!reviewer) {
                return {success:false,error:{statusCode: 404,msg:"Reviewer not found"}}
            }

            reviewer.pendingReviews.push(employee._id);
            await reviewer.save();

            console.log(reviewer);

            return {success:true,res:reviewer,msg:'Reviewer Added Successfully!!'};
        } catch (err) {
            return {success:false,error:{statusCode: 400,msg:err}}
        }
    }

    async getpendingReviews(reviewerId) {
        try{
            const employees = await EmployeeModel.findById(reviewerId).populate("pendingReviews");
            return {success:true,res:employees};
        } catch (err) {
            return {success:false,error:{statusCode: 400,msg:err}}
        }
    }

}