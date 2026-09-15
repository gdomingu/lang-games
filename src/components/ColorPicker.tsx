import {Dispatch, SetStateAction} from "react";

export default function ColorPicker({setColor}: {setColor: Dispatch<SetStateAction<string>>}) {
  const colors = ["#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];

  const handleColorChange = (color: string) => {
    setColor(color);
  };
  return (
    <span>
      {colors.map(color => (
        <button
          key={color}
          style={{backgroundColor: color, width: 30, height: 30, cursor: "pointer"}}
          onClick={() => handleColorChange(color)}
        />
      ))}
    </span>
  );
}
