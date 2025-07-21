import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div>
      <h1 className="flex justify-center items-center h-[500px]">
        <ReactLoading
          type={"spinningBubbles"}
          color={"rgb(53, 126, 221)"}
          height={100}
          width={100}
        />
      </h1>
    </div>
  );
};

export default Loading;
