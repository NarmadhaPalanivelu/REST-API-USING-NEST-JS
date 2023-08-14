/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'; // Add this import
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { UpdateStudentDto } from 'src/dto/update-student.dto';
import { IStudent } from 'src/interface/student.interface';

@Injectable()
export class StudentService {
    constructor(@InjectModel('Student') private studentModel: Model<IStudent>){
     
    }

    async createStudent(createStudentDto: CreateStudentDto): Promise<IStudent> {
        const newStudent = await new this.studentModel(createStudentDto);  
        return newStudent.save(); //save a new student
    }

    //reading all the student from mongodb
    
    async getAllStudents():Promise<IStudent[]>{
        const studentData = await this.studentModel.find()
        if(!studentData || studentData.length == 0){
           throw new NotFoundException("Student data not found")
        }
        return studentData 
    }
    //get a specific student by using this id
   async getStudent(studentId:string):Promise<IStudent>{
    const existingStudent = await this.studentModel.findById(studentId)
    if(!existingStudent){
        throw new NotFoundException('student #${studentID} not found')
    }
    return existingStudent
   }
   //delete a student by using it's id
   async deletedStudent(studentId:string):Promise<IStudent>{
    const deletedStudent = await this.studentModel.findByIdAndUpdate(studentId)
    if(!this.deletedStudent){
        throw new NotFoundException('student #${studentID} not found')
    }
    return deletedStudent
   }
   //updating existing student using it's id
    async updateStudent(studentId:string,UpdateStudentDto:UpdateStudentDto):Promise<IStudent>{
        const existingStudent = await this.studentModel.findByIdAndUpdate(studentId,UpdateStudentDto,{new:true})
        if(!existingStudent){
            throw new NotFoundException('student #${studentID} not found')
        }
        return existingStudent
    }
    
}

