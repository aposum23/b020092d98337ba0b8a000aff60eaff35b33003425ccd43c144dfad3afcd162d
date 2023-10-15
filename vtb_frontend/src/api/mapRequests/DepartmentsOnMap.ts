import {instance} from "@/api/requestsInstance.ts";

export const getDataAboutDepartments = (data:object) => instance({url:'banks_in_radius', method:'get', params: data});