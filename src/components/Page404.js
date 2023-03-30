import Nav from "./Nav";

const Page404 = () => {
  return (
    <div>
      <Nav />
      <div className=" pg-title mt-3 p-2 p404-title  rounded">
        <h1 className="spc-mrg">404</h1>
        <h4 className="spc-mrg">
          <u>Poll Not Found</u>
        </h4>
      </div>
      <div className="spc-mrg" style={{ color: "red" }}>
        <i>Poll you are searching for, does not exists.</i>
      </div>
    </div>
  );
};

export default Page404;
