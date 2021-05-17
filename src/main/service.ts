export interface ServiceOptions {
    initPriority: number;
}

export interface ServiceClass {
    prototype: any;
    init?(): Promise<any>;
}

export type ServiceDescriptor = {
    alias: string,
    class: ServiceClass,
} & ServiceOptions;

export const services: ServiceDescriptor[] = [];

export function service(alias: string, options: Partial<ServiceOptions> = {}) {
    return (target: ServiceClass) => {
        services.push({
            alias,
            class: target,
            initPriority: 0,
            ...options
        });
    };
}
