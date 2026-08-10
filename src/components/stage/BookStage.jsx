import StageBackground from "./StageBackground";
import StageLighting from "./StageLighting";

function BookStage({ children }) {
  return (
    <StageBackground>
      <StageLighting />

      <div
        className="
          relative
          flex
          items-center
          justify-center
          px-6
        "
      >
        {children}
      </div>
    </StageBackground>
  );
}

export default BookStage;