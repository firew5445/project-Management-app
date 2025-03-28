import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link,router } from "@inertiajs/react";
import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from "@/constants.jsx";

import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";




export default function Index({ auth, projects , queryParams = null}) {


    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
      if (value) {
        queryParams[name] = value;
      } else {
        delete queryParams[name];
      }
      router.get(route('project.index'),queryParams);
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
        router.get(route('project.index'),queryParams);
    };

    return (
        <AuthenticatedLayout 
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                    <th onClick={() => sortChanged('id')} className="px-3 py-3">ID</th>
<th className="px-3 py-3">Image</th>
<th onClick={() => sortChanged('name')} className="px-3 py-3">Name</th>
<th onClick={() => sortChanged('status')} className="px-3 py-3">Status</th>
<th className="px-3 py-3">Create Date</th>
<th onClick={() => sortChanged('due_date')} className="px-3 py-3">Due Date</th>
<th onClick={() => sortChanged('id')} className="px-3 py-3">Created By</th>
<th className="px-3 py-3 text-right">Actions</th>
                                        
                                    </tr>  
                                    <tr>  
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3">
                                            <TextInput className="w-full"
                                                placeholder="Projet name"
                                                defaultValue={queryParams.name || ''}
                                                onBlur={(e) => searchFieldChanged('name', e.target.value)}
                                                onKeyPress={e=>onKeyPress('name', e)}
                                             />
                                        </th>
                                        <th className="px-3 py-3">
                                        <SelectInput className="w-full"
                                        //defaultValue={queryParams.status }
    options={[
        { value: '', label: 'Select Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'in_progress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' }
    ]}
    defaultValue={queryParams.status ? { value: queryParams.status, label: PROJECT_STATUS_TEXT_MAP[queryParams.status] } : { value: '', label: 'Select Status' }}
    onChange={(selected) => searchFieldChanged("status", selected?.value)}
/>

                      
                        
                        
                       
                         
                      
                                                
                                                
                                        </th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                        <th className="px-3 py-3"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {projects.data.map((project) => (
                                        <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-3 py-2">{project.id}</td>
                                            <td className="px-3 py-2">
                                                <img 
                                                    src={project.img_path} 
                                                    style={{ width: 60 }} 
                                                    alt={project.name || "No Image"}
                                                />
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">{project.name}</td>
                                            <td className="px-3 py-2">
                                                <span className={
                                                    "px-2 py-1 rounded text-white " + 
                                                    PROJECT_STATUS_CLASS_MAP[project.status]
                                                }>
                                                    {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">{project.created_at}</td>
                                            <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                                            <td className="px-3 py-2 text-nowrap">{project.created_by.name}</td>
                                            <td className="px-3 py-2">
                                                <Link
                                                    href={route("project.edit", project.id)}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <Link
                                                    href={route("project.destroy", project.id)}
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

                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
      }

