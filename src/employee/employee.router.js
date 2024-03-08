import express from "express";
import EmployeeController from "./employee.controller.js";
import { adminAuth, auth } from "../../middlewares/auth.js";

const EmployeeRouter = express.Router();

const employeeController = new EmployeeController();

EmployeeRouter.get('/register',(req,res,next) => {
    employeeController.getRegistrationPage(req,res,next);
});

EmployeeRouter.get('/login',(req,res,next) => {
    employeeController.getLoginPage(req,res,next);
});

EmployeeRouter.get('/update',auth, adminAuth,(req,res,next) => {
    employeeController.getUpdatePage(req,res,next);
});

EmployeeRouter.get('/pending-reviews',auth,(req,res,next) =>{
    employeeController.getpendingReviewsPage(req,res,next);
})

EmployeeRouter.post('/register',(req,res,next) => {
    employeeController.register(req,res,next);
});

EmployeeRouter.post('/login',(req,res,next) => {
    employeeController.login(req,res,next);
});

EmployeeRouter.get('/logout',auth, (req,res,next) => {
    employeeController.logout(req,res,next);
})

EmployeeRouter.get('/add',auth,adminAuth,(req,res,next) => {
    employeeController.addEmployeePage(req,res,next);
});

EmployeeRouter.post('/add', auth,adminAuth,(req,res,next) => {
    employeeController.addEmployee(req,res,next);
});

EmployeeRouter.post('/update',auth,adminAuth,(req,res,next) => {
    employeeController.updateEmployee(req,res,next);
});

EmployeeRouter.get('/remove',auth,adminAuth,(req,res,next) => {
    employeeController.removeEmployee(req,res,next);
});

EmployeeRouter.post('/addReviewer',auth,adminAuth,(req,res,next) => {
    employeeController.addReviewer(req,res,next);
});

EmployeeRouter.get('/getAll',auth,adminAuth,(req,res,next) => {
    employeeController.getEmployees(req,res,next);
});

EmployeeRouter.get('/getEmployee',auth,(req,res,next) => {
    employeeController.getEmployee(req,res,next);
});

export default EmployeeRouter;
