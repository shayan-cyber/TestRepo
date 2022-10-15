import React from "react";
import Table from "../components/Table";
import axios from "axios";
import { useEffect, useState } from "react";
// import axios from "axios";
// import Records from "../components/Records";
import { useCookies } from "react-cookie";
function Home({ resdata }) {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const [auth_token, setAuthToken] = useState("");
  const [username, setUsername] = useState("")
  const [cookieUsername, setCookieUsername, removeCookieUsername] = useCookies(['username'])
  // const router = useRouter();
  useEffect(() => {
    if (cookie["token"]) {
      setAuthToken(cookie["token"]);
    }
    if(cookieUsername['username']){
        setUsername(cookieUsername['username'])
    }
  }, [auth_token]);
  const [data, setData] = useState(resdata);
  console.log({ data });

  const [flag, setFlag] = useState(false);
  // const [saveFlag, setSaveFlag] = useState(false)
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [performance, setPerformance] = useState("A+");
  const [attendance, setAttendance] = useState("");

  const addRecord = () => {
    if (flag && course && name && performance && attendance) {
      let body = {
        name: name,
        course: course,
        attendance: attendance,
        performance: performance,
      };
      // console.log({data});

      let url = "http://127.0.0.1:8000/api/add-student-details/";

      axios
        .post(url, body)
        .then((e) => {
          console.log({ e });
          let newdata = [...data, e.data.serializer_data];
          console.log({ newdata });
          newdata.sort((a, b) => b.attendance - a.attendance);
          console.log({ newdata });
          setData(newdata);

          setName("");
          setAttendance("");
          setCourse("");
          setPerformance("A+");
        })
        .catch((err) => {
          console.log({ err });
        });
    }
    setFlag(!flag);
  };
  return (
    <>
     <div className="flex justify-between items-start mt-3 mb-8">
            <h1 className="text-2xl text-indigo-600">Attendance Management System</h1>

            <div className="flex justify-start items-center">

                <div className="h-8 w-8 rounded-full bg-slate-200">

                </div>
                <div className="text-lg font-medium mx-2 text-gray-600">
                    {username?username :"Not Authorized"}

                </div>

            </div>

        </div>
        <div className="flex justify-center items-start">
          <Table
            data={data}
            flag={flag}
            input_data={{
              name: name,
              course: course,
              attendance: attendance,
              performance: performance,
            }}
            set_input_data={{
              setName: setName,
              setCourse: setCourse,
              setAttendance: setAttendance,
              setPerformance: setPerformance,
            }}
            addRecord={addRecord}
            auth_token={auth_token}
          />
        </div>
    </>
  );
}

export default Home;

export async function getServerSideProps() {
  let resp = await axios.get("http://127.0.0.1:8000/api/student-details/");
  let resdata = resp?.data;
  console.log({ resdata });
  return {
    props: {
      resdata,
    },
  };
}
