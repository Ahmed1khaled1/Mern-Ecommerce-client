import React from "react";
import { Input } from "../ui/input";
import {
  SelectContent,
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isButtonDisabld,
}) {
  const inputByComponentType = (getcontrolItem) => {
    let element = null;
    const value = formData[getcontrolItem.name] || "";
    switch (getcontrolItem.componentType) {
      case "input":
        element = (
          <Input
            name={getcontrolItem.name}
            type={getcontrolItem.type}
            placeholder={getcontrolItem.placeholder}
            id={getcontrolItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getcontrolItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getcontrolItem.name]: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getcontrolItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getcontrolItem.options && getcontrolItem.options.length > 0
                ? getcontrolItem.options.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;

      default:
        element = (
          <Textarea
            name={getcontrolItem.name}
            placeholder={getcontrolItem.placeholder}
            id={getcontrolItem.name}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getcontrolItem.name]: event.target.value,
              })
            }
            className="grid-cols-4"
          />
        );
        break;
    }
    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((item) => (
          <div key={item.name} className="max-w-screen">
            <Label className="mb-2 font-medium">{item.label}</Label>
            {inputByComponentType(item)}
          </div>
        ))}
      </div>
      <Button
        disabled={isButtonDisabld}
        type="submit"
        className="mt-5 w-full cursor-pointer"
      >
        {buttonText || "submit"}{" "}
      </Button>
    </form>
  );
}

export default CommonForm;
