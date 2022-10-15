import React from "react";
import Link from "next/link";
function Table({
  data,
  flag,
  input_data,
  set_input_data,
  addRecord,
  auth_token,
}) {
  console.log({ flag });
  return (
    <div className="bg-white shadow-lg rounded-lg  w-full border-0">
      <div className="flex justify-between items-center w-full border-b-2 px-4 py-3">
        <h1 className="text-lg text-indigo-400 font-medium">Records</h1>

        {auth_token ? (
          flag &&
          input_data.name &&
          input_data.course &&
          input_data.attendance ? (
            <div
              className="bg-green-400 rounded-md text-white p-2 px-8 shadow-md cursor-pointer"
              onClick={addRecord}
            >
              Finish
            </div>
          ) : (
            <div
              className="bg-primary rounded-md text-white p-2 px-8 shadow-md cursor-pointer"
              onClick={addRecord}
            >
              + Add Record
            </div>
          )
        ) : (
          <Link href="/login">
          <div className="bg-primary rounded-md text-white p-2 px-8 shadow-md cursor-pointer">
            Login
          </div>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-4 gap-0 text-base text-gray-400 font-medium px-6 py-3 border-b-2">
        <h1 className="">Name</h1>
        <h1 className="">Course</h1>
        <h1 className="">Performance</h1>
        <h1 className="">Attendance</h1>
      </div>

      {flag && (
        <div className="grid grid-cols-4 gap-0 px-6 py-3 border-2 border-indigo-300">
          <input
            className="rounded-md bg-indigo-100 p-2 mx-2"
            value={input_data.name}
            onChange={(e) => set_input_data.setName(e.target.value)}
          />
          <input
            className="rounded-md bg-indigo-100 p-2 mx-2"
            value={input_data.course}
            onChange={(e) => set_input_data.setCourse(e.target.value)}
          />
          <select
            className="rounded-md bg-indigo-100 p-2 mx-2"
            value={input_data.performance}
            onChange={(e) => {
              set_input_data.setPerformance(e.target.value);
              console.log(input_data.performance);
            }}
          >
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="C-">C-</option>
            <option value="D+">D+</option>
            <option value="D">D</option>
            <option value="D-">D-</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="F">F</option>

          </select>
          <input
            className="rounded-md bg-indigo-100 p-2 mx-2"
            type="number"
            value={input_data.attendance}
            onChange={(e) => set_input_data.setAttendance(e.target.value)}
          />
        </div>
      )}

      {/* <input className="rounded-md bg-indigo-100 p-2 mx-2"/>
        <input className="rounded-md bg-indigo-100 p-2 mx-2"/>
        <input className="rounded-md bg-indigo-100 p-2 mx-2"/>
        <input className="rounded-md bg-indigo-100 p-2 mx-2"/> */}
      {/* </div> */}

      {data.map((item, ind) => (
        <div
          className={
            ind == 0
              ? "grid grid-cols-4 bg-emerald-200 gap-0 text-base text-black font-semibold px-6 py-3 border-b-2"
              : ind == data.length - 1
              ? "grid grid-cols-4 gap-0 text-base text-black font-semibold px-6 py-3 border-b-2 bg-red-400"
              : "grid grid-cols-4 gap-0 text-base text-black font-semibold px-6 py-3 border-b-2"
          }
          key={ind}
        >
          <h1 className="">{item.name}</h1>
          <h1 className="">{item.course}</h1>
          <h1 className="">{item.performance}</h1>
          <h1 className="">{item.attendance}</h1>
        </div>
      ))}
    </div>
  );
}

export default Table;
