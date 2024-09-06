import React from "react";
import ScrollView from "devextreme-react/scroll-view";
import "./single-card.scss";

export default function SingleCard({
  title,
  description,
  component,
  children,
}) {
  return (
    <ScrollView
      height={"100%"}
      width={"100%"}
      className={"with-footer single-card"}
    >
      <div className={"dx-card content"}>
        <div className={"header"}>
          {component ? (
            <div className="flex justify-between flex-1">
              <div className={"title"}>{title}</div>
              <div className={"title"}>{component}</div>
            </div>
          ) : (
            <div className={"title"}>{title}</div>
          )}
          <div className={"description"}>{description}</div>
        </div>
        {children}
      </div>
    </ScrollView>
  );
}
