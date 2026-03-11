import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel
} from "@tanstack/react-table";

import { db } from "./Firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

const Basic = () => {

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [standard, setStandard] = useState("");
  const [section, setSection] = useState("");
  const [age, setAge] = useState("");

  const [editId, setEditId] = useState(null);

  const getStudents = async () => {

    const querySnapshot = await getDocs(collection(db, "students"));

    const list = [];

    querySnapshot.forEach((doc) => {
      list.push({
        id: doc.id,
        ...doc.data()
      });
    });

    setStudents(list);
  };

  useEffect(() => {
    getStudents();
  }, []);

  const addStudent = async () => {

    if (editId === null) {

      await addDoc(collection(db, "students"), {
        name: name,
        email: email,
        phone: phone,
        standard: standard,
        section: section,
        age: age
      });

    } else {

      const studentRef = doc(db, "students", editId);

      await updateDoc(studentRef, {
        name: name,
        email: email,
        phone: phone,
        standard: standard,
        section: section,
        age: age
      });

      setEditId(null);
    }

    setName("");
    setEmail("");
    setPhone("");
    setStandard("");
    setSection("");
    setAge("");

    getStudents();
  };

  const deleteStudent = async (id) => {

    const studentRef = doc(db, "students", id);

    await deleteDoc(studentRef);

    getStudents();
  };

  const editStudent = (student) => {

    setName(student.name);
    setEmail(student.email);
    setPhone(student.phone);
    setStandard(student.standard);
    setSection(student.section);
    setAge(student.age);

    setEditId(student.id);
  };

  const columns = [

    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "standard", header: "Class" },
    { accessorKey: "section", header: "Section" },
    { accessorKey: "age", header: "Age" },

    {
      header: "Action",
      cell: ({ row }) => (

        <div className="flex gap-2">

          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => editStudent(row.original)}
          >
            Edit
          </button>

          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => deleteStudent(row.original.id)}
          >
            Delete
          </button>

        </div>

      )
    }

  ];

  const table = useReactTable({
    data: students,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h2 className="text-3xl font-bold text-center mb-8">
        Student Management
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-8">

        <input
          className="border p-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Class"
          value={standard}
          onChange={(e) => setStandard(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

      </div>

      <button
        className="bg-green-600 text-white px-6 py-2 rounded mb-8"
        onClick={addStudent}
      >
        Save Student
      </button>

      <div className="bg-white shadow-lg rounded">

        <table className="min-w-full">

          <thead className="bg-gray-800 text-white">

            {table.getHeaderGroups().map((headerGroup) => (

              <tr key={headerGroup.id}>

                {headerGroup.headers.map((header) => (

                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-6 py-3 cursor-pointer"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>

                ))}

              </tr>

            ))}

          </thead>

          <tbody>

            {table.getRowModel().rows.map((row) => (

              <tr key={row.id} className="border-b hover:bg-gray-100">

                {row.getVisibleCells().map((cell) => (

                  <td key={cell.id} className="px-6 py-3">

                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}

                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Basic;