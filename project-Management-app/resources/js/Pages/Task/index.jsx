import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link,router } from "@inertiajs/react";
import { TASK_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP } from "@/constants.jsx";

import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";



export default function Index({ auth, tasks , queryParams = null,success}) {


    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
      if (value) {
        queryParams[name] = value;
      } else {
        delete queryParams[name];
      }
      router.get(route('task.index'),queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
    
        searchFieldChanged(name, e.target.value);
      };

      const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
          if (queryParams.sort_direction === "asc") {
            queryParams.sort_direction = "desc";
          } else {
            queryParams.sort_direction = "asc";
          }
        } else {
          queryParams.sort_field = name;
          queryParams.sort_direction = "asc";
        }
        router.get(route('task.index'),queryParams);
    };

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tasks
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                
                                
    <tr className="text-nowrap border-b border-gray-500">
        
    <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>

        <th className="px-3 py-3 border-b border-gray-500">Image</th>
        <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Name
                      </TableHeading>

                     

     <TableHeading
  name="status"
  sort_field={queryParams.sort_field}
  sort_direction={queryParams.sort_direction}
  sortChanged={sortChanged}
>
  Status
</TableHeading>
<TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Create Date
                      </TableHeading>

                      <TableHeading
                        name="due_date"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Due Date
                      </TableHeading>
        <th  className="px-3 py-3 border-b border-gray-500">Created By</th>
        <th className="px-3 py-3 text-right border-b border-gray-500">Actions</th>
    </tr>
    <tr className="border-b border-gray-500">
        <th className="px-3 py-3 border-b border-gray-500"></th>
        <th className="px-3 py-3 border-b border-gray-500"></th>
        <th className="px-3 py-3 border-b border-gray-500">
            <TextInput className="w-full"
                placeholder="Task name"
                defaultValue={queryParams.name || ''}
                onBlur={(e) => searchFieldChanged('name', e.target.value)}
                onKeyPress={e=>onKeyPress('name', e)}
            />
        </th>
        <th className="px-3 py-3 border-b border-gray-500">
            <SelectInput className="w-full"
                options={[
                    { value: '', label: 'Select Status' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'in_progress', label: 'In Progress' },
                    { value: 'completed', label: 'Completed' }
                ]}
                defaultValue={queryParams.status ? { value: queryParams.status, label: TASK_STATUS_TEXT_MAP[queryParams.status] } : { value: '', label: 'Select Status' }}
                onChange={(selected) => searchFieldChanged("status", selected?.value)}
            />
        </th>
        <th className="px-3 py-3 border-b border-gray-500"></th>
        <th className="px-3 py-3 border-b border-gray-500"></th>
        <th className="px-3 py-3 border-b border-gray-500"></th>
        <th className="px-3 py-3 border-b border-gray-500"></th>
    </tr>
</thead>


                                <tbody>
                                    {tasks.data.map((task) => (
                                        <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-2">{task.id}</td>
                                            <td className="px-3 py-2">
                                                <img 
                                                    src={task.img_path} 
                                                    style={{ width: 60 }} 
                                                    alt={task.name || "No Image"}
                                                />
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">{task.name}</td>
                                            <td className="px-3 py-2">
                                                <span className={
                                                    "px-2 py-1 rounded text-white " + 
                                                    TASK_STATUS_CLASS_MAP[task.status]
                                                }>
                                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                                            <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                                            <td className="px-3 py-2 text-nowrap">{task.created_by.name}</td>
                                            <td className="px-3 py-2">
                                                <Link
                                                    href={route("task.edit", task.id)}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route("task.destroy", task.id)}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                >
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>

                            <Pagination links={tasks.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
      } 