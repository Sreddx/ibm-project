from ast import Import
import json
import sys
from unicodedata import numeric
import psycopg2
import psycopg2.extras

import sqlalchemy
from sqlalchemy import *
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import Session

from flask import Flask, jsonify, request, session, send_from_directory

from flask_cors import CORS

from backend.DB_Connections.DBManager import DBManager

Base = declarative_base()
db = DBManager.getInstance() 


class Employee(Base):
    __tablename__ = "employee"
    id_employee = Column(Integer, primary_key=True)
    employee_name = Column(String(150))
    employee_lastname = Column(String(150))
    mail = Column(String(150))
    country_origin = Column(String(150))
    id_ica = Column(Integer, ForeignKey("ica.id_ica"))
    country_residence = Column(String(150))
    id_type = Column(Integer, ForeignKey("type.id_type"))
    band = Column(Integer)
    squad = Column(String(150))
    start_date = Column(Date)
    end_date = Column(Date)

    def __init__(self,name,lastName, mail, countryOrigin,idIcaTable,countryResidence,id_typeTable,band,squad,start_date,end_date):
        self.employee_name = name
        self.employee_lastname = lastName
        self.mail = mail
        self.country_origin = countryOrigin
        self.id_ica = idIcaTable
        self.country_residence = countryResidence
        self.id_type = id_typeTable
        self.band = band
        self.squad = squad
        self.start_date = start_date
        self.end_date = end_date


    def serialize(self):
        return {
            'employee_id': self.id_employee, 
            'employeeName': self.employee_name,
            'employeeLastName': self.employee_lastname,
            'mail':  self.mail,
            'countryOrigin': self.country_origin,
            'ICA_ID': self.id_ica,
            'countryResidence': self.country_residence,
            'type_id': self.id_type,
            'band': self.band,
            'squad': self.squad,
            'startDate': self.start_date,
            'endDate': self.end_date
        }

class ICA(Base):
    __tablename__ = "ica"
    id_ica = Column(Integer, primary_key=True)
    ica_code = Column(String(120))
    ica_core = Column(String(120))
    year = Column(String(120))
    id_planning = Column(String(50))
    ica_owner = Column(String(150))
    budget = Column(Integer)
    country = Column(String(120))
    status = Column(String(200))
    depto = Column(String(50))
    frequency_bill = Column(String(50))
    cc = Column(String(50))
    city_name_req = Column(String(100))
    division = Column(String(50))
    major = Column(String(50))
    minor = Column(String(50))
    leru = Column(String(50))
    description = Column(String(200))
    id_type = Column(Integer, ForeignKey("type.id_type"))
    nec = Column(Integer)
    total_plus_taxes = Column(Float)
    start_Date = Column(Date)
    end_date = Column(Date)
    cty_name_perf = Column(String(50))
    R_Cty_Perf = Column(String(100))
    total_billing = Column(Float)

    def __init__(self,idIca,icaCode,icaCore,year,idPlanning,icaOwner,budget,country,status,depto,frequencyBill,cc,cityNameReq,division,major,
    minor,leru,description,idType,nec,totalPlusTax,startDate,endDate,ctyNamePerf,rCtyPerf,totalBilling):
        self.id_ica = idIca
        self.ica_code = icaCode
        self.ica_core = icaCore
        self.year = year
        self.id_planning = idPlanning
        self.ica_owner = icaOwner
        self.budget = budget
        self.country = country
        self.status = status
        self.depto = depto
        self.frequency_bill = frequencyBill
        self.cc = cc
        self.city_name_req = cityNameReq
        self.division = division
        self.major = major
        self.minor = minor
        self.leru = leru
        self.description = description
        self.id_type = idType
        self.nec = nec
        self.total_plus_taxes = totalPlusTax
        self.start_Date = startDate
        self.end_date = endDate
        self.cty_name_perf= ctyNamePerf
        self.R_Cty_Perf = rCtyPerf
        self.total_billing = totalBilling


class Types(Base):
   
    __tablename__ = "type"
    id_type = Column(Integer, primary_key=True)
    type_name = Column(String(150))
    band = Column(Integer)
    country = Column(String(150))
    rate = Column(Integer)
    date_to_start = Column(Date)
    date_to_finish = Column(Date)

    def __init__(self, name, band, country, rate, date_start, date_finish):
        self.type_name = name
        self.band = band
        self.country = country
        self.rate = rate
        self.date_to_start = date_start 
        self.date_to_finish = date_finish

def getEmployees():
    global db
    if db==None:
        db=DBManager.getInstance
    employeeList = []

    stmt = select(Employee)
    for employee in db.session.scalars(stmt):
        employeeList.append(employee)
        # print(expense.id_type_of_expense)
        # print(expense.type_name)
        # print(expense.expense_amount)
    resp = jsonify([e.serialize() for e in employeeList]) #Con esto puedes mandar lista de objetos en json
    return resp

def newPostEmployee():
    print("si")
    _json = request.json
    _firstName = _json['firstName']
    _lastName = _json['lastName']
    _email = _json['email']
    _originCountry = _json['originCountry']
    _ICA = _json['ICA']
    _currentCountry = _json['currentCountry']
    _type = _json['type']
    _band = _json['band']
    _squad = _json['squad']
    _dateStart = _json['dateStart']
    _dateFinish = _json['dateFinish']
    


    if request.method == 'POST':
        if not _firstName or not _lastName or not _email or not _originCountry or not _ICA or not _currentCountry or not _type or not _squad or not _dateStart or not _dateFinish:
            return "Values fields are incomplete"
        else:
            employee = Employee( _firstName, _lastName,  _email,  _originCountry, _ICA,  _currentCountry,  _type, _band, _squad,  _dateStart, _dateFinish)
            
            db.session.add(employee)
            db.session.commit()
            
            return "New Employee Uploaded Succesfully"


def deleteEmployee(id):
    global db
    if request.method == 'DELETE':
        # autoIncrement = "alter sequence id_type_of_expense_type_seq restart "+ str(id)
        # db.session.execute(autoIncrement)
        queryCheck = select(Employee).where(Employee.id_employee == id)
        expType=db.session.scalar(queryCheck)
        if(expType == None): #check if record does exist
            return "Employee record not found"
        else:
            stmt = delete(Employee).where(Employee.id_employee == id)
            print(stmt)
            db.session.execute(stmt)
            db.session.commit()

            return "Employee delete done"


def updateEmployee(id):

    _json = request.json
    newEmployee = Employee(
        _json['firstName'], 
        _json['lastName'], 
        _json['email'],
        _json['originCountry'],
        _json['ICA'], 
        _json['currentCountry'],
        _json['type'],
        _json['band'],
        _json['squad'],
        _json['dateStart'],
        _json['dateFinish'] 

        )
    
    editEmployee = db.session.query(Employee).filter(Employee.id_employee == id).one()
    print(editEmployee.employee_name)

    editEmployee.employee_name = newEmployee.employee_name 
    editEmployee.employee_lastname = newEmployee.employee_lastname 
    editEmployee.mail = newEmployee.mail 
    editEmployee.country_origin = newEmployee.country_origin 
    editEmployee.id_ica = newEmployee.id_ica 
    editEmployee.country_residence = newEmployee.country_residence 
    editEmployee.id_type = newEmployee.id_type  
    editEmployee.band = newEmployee.band  
    editEmployee.squad = newEmployee.squad  
    editEmployee.start_date = newEmployee.start_date  
    editEmployee.end_date = newEmployee.end_date 

    db.session.commit()

    return "DONE"