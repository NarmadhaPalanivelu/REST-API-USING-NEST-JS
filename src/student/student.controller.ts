/* eslint-disable prettier/prettier */
import { Controller, Post,Get,Put,Delete, Res, Body, HttpStatus, Param } from '@nestjs/common';
import { CreateStudentDto } from '../dto/create-student.dto'; // Adjust the path as needed
import { StudentService } from './student.service'; // Import the StudentService
import { UpdateStudentDto } from 'src/dto/update-student.dto';
import { response } from 'express';

@Controller('student')
export class StudentController {

    constructor(private readonly studentService: StudentService) {} 

    @Post()
    async createStudent(@Res() response, @Body() createStudentDto: CreateStudentDto) {
        try {
            const newStudent = await this.studentService.createStudent(createStudentDto); // Correct the method name
            return response.status(HttpStatus.CREATED).json({
                message: 'Student has been created successfully',
                newStudent // You can send back the created student data if needed
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Student not created',
                error: 'Bad Request'
            });
        }
    }
    @Get()
    async getStudents(@Res() response){
        try{
            const studentData = await this.studentService.getAllStudents()
            return response.status(HttpStatus.OK).json({
                message:"All student data found successfully",
                studentData
            })

        }catch(err){
       return response.status(err.status).json(err.response)

        }
        }
        @Put('/:id') 
        async updateStudent(@Res() response, @Param('id') studentId:string,
        @Body() updateStudentDto:UpdateStudentDto){
            try{
                const existingStudent = await this.studentService.updateStudent(studentId,updateStudentDto) 
                return response.status(HttpStatus.OK).json({
                    message: 'Student has been successfully updated',
                    existingStudent
                });
            }catch(err){
                return response.status(err).json(err.response)
            }
      
        }
        @Delete('\id')
        async deleteStudent(@Res() Response, @Param('id')studentId:string){
            try{

                const deletedStudent = await this.studentService.deletedStudent(studentId)
                return Response.status(HttpStatus.OK).JSON({
                    message:"Student deleted successfully",
                    deletedStudent
                })
            }catch(err){
                return response.status(err).json(err.response)
            }
        }
         
    
}
