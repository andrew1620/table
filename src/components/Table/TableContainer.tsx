import React from "react";
import { DataItem } from "./interfaces";
import { Table } from "./Table";

interface Props {
  data: Array<DataItem>;
}

const map = new Map();

map.set("2", new Map());

export const TableContainer: React.FC<Props> = ({ data }) => {
  const objectData: Record<number, DataItem> = {};
  for (let item of data) {
    objectData[item.id] = item;
  }

  // function generateTableData(data: Array<DataItem>, parentId: number) {
  //   const generatedArr: Array<DataItem & {children?: Array<DataItem>}> = []

  //   const filteredByParent = data.filter(item => item.parentId === parentId)

  //   for (let item of filteredByParent) {

  //     const item = objectData[item.id]

  //     arr.push(item)
  //   }
  // }
  function func(data: Array<any>) {
    const objectData: Record<
      number,
      DataItem & { children?: Array<DataItem> }
    > = {};
    for (let item of data) {
      objectData[item.id] = { ...item };
    }

    for (let id in objectData) {
      const elem = objectData[id];

      if (elem.parentId > 0) {
        const elemParent = objectData[elem.parentId];
        Array.isArray(elemParent.children)
          ? elemParent.children.push(elem)
          : (elemParent.children = [elem]);
      }
    }

    for (let id in objectData) {
      if (objectData[id].parentId !== 0) {
        delete objectData[id];
      }
    }

    return objectData;
  }

  return <Table />;
};
