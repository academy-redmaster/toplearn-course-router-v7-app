import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import moment from "moment/moment";
import { Link } from "react-router";

const statusColorMap = {
  pending: "secondary",
  in_progress: "warning",
  completed: "success",
  archived: "primary",
};

export default function TableTodo({ columns, todos }) {
  const renderCell = React.useCallback((todo, columnKey) => {
    const cellValue = todo[columnKey];

    switch (columnKey) {
      case "title":
        return (
          <User
            avatarProps={{
              radius: "full",
              src: todo.owner.profilePhoto,
              isBordered: true,
              color: "default",
              variant: "bordered",
            }}
            description={todo.title}
            name={cellValue}
          >
            {todo.description}
          </User>
        );
      case "dueDate":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">
              due:{moment(todo.dueDate).format("MMM Do YYYY")}
            </p>
            <p className="text-bold text-sm capitalize text-default-400">
              {todo.daysLeft}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[todo.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <Link
                to={todo.id}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <i className="ri-eye-line"></i>
              </Link>
            </Tooltip>
            <Tooltip content="Edit todo">
              <Link
                to={`${todo.id}/edit`}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <i className="ri-edit-line"></i>
              </Link>
            </Tooltip>
            <Tooltip color="success" content="completed todo">
              <Link
                to={`${todo.id}/complete`}
                className="text-lg text-success cursor-pointer active:opacity-50"
              >
                {todo.isCompleted ? (
                  <i className="ri-check-double-line"></i>
                ) : (
                  <i className="ri-check-line"></i>
                )}
              </Link>
            </Tooltip>
            <Tooltip
              color="secondary"
              content={todo.isArchived ? "UnArchived" : "Archived"}
            >
              <Link
                to={`${todo.id}/archive`}
                className="text-lg text-secondary cursor-pointer active:opacity-50"
              >
                {todo.isArchived ? (
                  <i className="ri-bookmark-fill"></i>
                ) : (
                  <i className="ri-bookmark-line"></i>
                )}
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="Delete todo">
              <Link
                to={`${todo.id}/delete`}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <i className="ri-delete-bin-5-line"></i>
              </Link>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={todos}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
