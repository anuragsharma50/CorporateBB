import { sendToken } from "../../utils/sendToken.js";
import EmployeeRepository from "./employee.repository.js";


export default class EmployeeController {

    constructor() {
        this.employeeRepository = new EmployeeRepository();
    }

    async getRegistrationPage(req,res,next) {
        res.render('register',{error:null});
    }

    async getLoginPage(req,res,next) {
        res.render('login',{error:null});
    }

    async addEmployeePage(req,res,next) {
        res.render('addEmployee',{error:null});
    }

    async getpendingReviewsPage(req,res,next) {
        const reviewerId = req.userId;
        const resp = await this.employeeRepository.getpendingReviews(reviewerId);
        if(resp.success){
            res.render('pendingReviews',{error:null,employees:resp.res.pendingReviews,reviewer:resp.res});
        }
        else{
            console.log(resp.error.msg);
        }
    }

    async getUpdatePage(req,res,next) {
        const assignedEmployeeId = req.query.assignedEmployeeId;
        const resp = await this.employeeRepository.getEmployee(assignedEmployeeId);
        if(resp.success) {
            res.render('updateEmployee',{error:null,employee:resp.res});
        }
        else{
            console.log(resp.error.msg);
        }
    }

    async register(req,res,next) {
        const {name,email,password, assignedEmployeeId} = req.body;
        const resp = await this.employeeRepository.addEmployee(name,email,password,assignedEmployeeId);
        if(resp.success) {
            sendToken(resp.res,res,200);
            if(resp.res.admin) {
                return res.redirect('/employee/getAll');
            }
            return res.redirect('/employee/pending-reviews');
        }
        else{
            res.render('register',{error:resp.error.msg});
            console.log(resp.error.msg);
        }
    }

    async login(req,res,next) {
        const {email,password} = req.body;
        const resp = await this.employeeRepository.verifyEmployee({email,password});
        if(resp.success) {
            sendToken(resp.res,res,200);
            if(resp.res.admin) {
                return res.redirect('/employee/getAll');
            }
            return res.redirect('/employee/pending-reviews');
        }
        else{
            console.log(resp.error.msg);
        }
    }

    async logout(req,res,next) {
        res.status(200).cookie("token",null,{
            expires: new Date(Date.now()),
            httpOnly: true
        });
        res.redirect("/employee/login");
    }

    async addEmployee(req,res,next) {
        const {name,email,password, assignedEmployeeId,admin} = req.body;
        const resp = await this.employeeRepository.addEmployee(name,email,password,assignedEmployeeId,admin);
        if(resp.success) {
            return res.redirect('getAll');
        }
        else{
            console.log(resp.error.msg);
        }
    }

    async updateEmployee(req,res,next) {
        const {assignedEmployeeId,name,email,admin} = req.body;
        const resp = await this.employeeRepository.updateEmployee(assignedEmployeeId,{name,email,admin});
        if(resp.success) {
            // return res.render('',{employee:resp.res});
            return res.redirect('getAll');
        }
        else{
            console.log(resp.error.msg);
        }
    }

    async removeEmployee(req,res,next) {
        const resp = await this.employeeRepository.removeEmployee(req.query.assignedEmployeeId);
        if(resp.success) {
            // return res.render('');
            return res.redirect('getAll');
        }
        else{
            console.log(resp.error.msg);
        }
    }

    async getEmployees(req,res,next) {
        const resp = await this.employeeRepository.getAllEmployees();
        if(resp.success) {
            return res.render('allEmployee',{employees:resp.res});
        }
        else{
            console.log(resp.error.msg);
        }
    }

    async getEmployee(req,res,next) {
        const assignedEmployeeId = req.query.assignedEmployeeId;
        const resp = await this.employeeRepository.getEmployee(assignedEmployeeId);
        if(resp.success) {
            return res.render('',{employee:resp.res});
        }
        else{
            console.log(resp.error.msg);
        }
    }

    async addReviewer(req,res,next) {
        const {assignedEmployeeId,reviewerId} = req.body;
        const resp = await this.employeeRepository.addEmployeeToReview(assignedEmployeeId,reviewerId);
        if(resp.success) {
            // return res.render('allEmployee',{msg:resp.msg});
            return res.redirect('getAll');
        }
        else{
            console.log(resp.error.msg);
        }
    }
}