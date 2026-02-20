import type { FC, HTMLAttributes } from "react";

type variantType = "main" | "secondary" | "border" | "inverse"

interface Props extends HTMLAttributes<HTMLInputElement> {
  text: string;
  variant?: variantType
}

// функциональный компонент
export const Button: FC<Props> = function Button({ text, variant, ...props }) {
    const getVariantStyles = (type: variantType) =>{
        if(type == "secondary"){
            return "bg-purple-400 text-white"
        }
        else if(type == "main"){
            return "bg-yellow-500 text-black"
        }
        else if(type == "border"){
            return "border border-purple-400 text-black"
        }
        else if(type == "inverse"){
            return "bg-white text-black"
        }
        return ""
    }
  return (
    <input
        {...props}  
        type={props.typeof || "button"}
        value={text}
        className={`rounded-sm font-bold text-xl p-4 ${getVariantStyles(variant || "main")} ${props.className}`}
    />
  );
};
