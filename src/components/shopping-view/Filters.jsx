import { filterOptions } from "@/config";
import React from "react";
import { Checkbox } from "../ui/checkbox";

function Filters({ filters, handleFilter }) {
  return (
    <div>
      <div className="font-bold border-b p-2 text-xl">Filters</div>
      {Object.keys(filterOptions).map((section) => (
        <div className="border-b pb-2" key={section}>
          <h1 className="font-bold p-2 text-xl">{section}</h1>
          <div>
            {filterOptions[section].map((option) => (
              <div key={option.label} className="flex gap-2 items-center">
                <Checkbox
                  checked={
                    filters &&
                    Object.keys(filters).length > 0 &&
                    filters[section] &&
                    filters[section].indexOf(option.id) > -1
                  }
                  onCheckedChange={() => handleFilter(section, option.id)}
                />
                {option.label}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Filters;
