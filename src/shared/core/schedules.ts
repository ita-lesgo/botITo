import * as teachers from "@shared/core/teachers"
import { Lesson } from "@shared/core/class"

const Qui11:Lesson  = {
	name: "Quimica 1",
	teacher: teachers.custodio
}

const Qui21:Lesson  = {
	name: "Quimica 2",
	teacher: teachers.lacerda
}

const Fis31:Lesson  = {
	name: "Fisica 3",
	teacher: teachers.yasmine
}

const Mat21:Lesson  = {
	name: "Matemática 2",
	teacher: teachers.max
}

const Qui5:Lesson  = {
	name: "Olimpiada de quimica",
	teacher: teachers.emmanuel
}

const Geo:Lesson  = {
	name: "Geografia",
	teacher: teachers.franze
}

const Eng:Lesson  = {
	name: "Ingles",
	teacher: teachers.angelo
}


const Gra:Lesson  = {
	name: "Gramatica",
	teacher: teachers.rebeca
}

const Fis11:Lesson  = {
	name: "Fisica 1",
	teacher: teachers.ulisses
}


const Mat31:Lesson  = {
	name: "Matemática 3",
	teacher: teachers.rafael
}

const Lit:Lesson  = {
	name: "Literatura",
	teacher: teachers.lourenco
}

const Fis21:Lesson  = {
	name: "Fisica 2",
	teacher: teachers.mathues
}

const Bio11:Lesson  = {
	name: "Biologia",
	teacher: teachers.rose
}

const His11:Lesson  = {
	name: "Historia",
	teacher: teachers.juliete
}

const Mat11:Lesson  = {
	name: "Matemática 1",
	teacher: teachers.davyson
}

const Mat5:Lesson  = {
	name: "Olimpiada de Matemática",
	teacher: teachers.jr
}

const Red:Lesson  = {
	name: "Redação",
	teacher: teachers.jr
}

const Fil:Lesson  = {
	name: "Filosofia",
	teacher: teachers.cicero
}

const Fis5:Lesson  = {
	name: "Olimpiada de Fisica",
	teacher: teachers.arilo
}

export const itinhasClasses = {
	dom: {

	},
	seg: {
		"13:20": Qui11,
		"15:00": Qui21,
		"16:15": Fis31,
		"17:05": Mat21,
		"17:55": Qui5
	},
	ter: {
		"07:20": Geo,
		"08:10": Eng,
		"10:15": Gra,
		"13:20": Fis11,
		"14:10": Mat21,
		"16:15": Mat31,
		"17:55": Lit,
		"19:00": Fis21
	},
	qua: {
		"08:10": Bio11,
		"10:15": His11,
		"13:20": Fis21,
		"14:10": Lit,
		"15:00": Mat11,
		"16:15": Mat11,
		"17:05": Fis21,
		"17:55": Mat5
	},
	qui: {
		"07:20": Geo,
		"08:10": Eng,
		"10:15": Gra,
		"13:20": Fis11,
		"14:10": Red,
		"16:15": Mat11,
		"17:55": Fis11,
		"19:00": Fil
	},
	sex: {
		"13:20": Qui21,
		"14:10": Qui11,
		"16:15": Fis5,
		"17:05": Fis31,
		"17:55": Fis5
	},
	sab: {}
}