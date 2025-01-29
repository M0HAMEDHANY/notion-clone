'use client'
import { usePathname } from 'next/navigation';
import React, { Fragment } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTheme } from './ThemeProvider';


function Breadcrumbs() {
    const path = usePathname();
    const segments = path.split("/").filter((segment) => segment !== "");
    const { theme } = useTheme();
    return (
        <Breadcrumb className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            <BreadcrumbList>
            <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            
            {segments.map((segment, index) => {
                if (!segment) return null;

                const href = `/${segments.slice(0, index + 1).join("/")}`;
                const isLast = index === segments.length - 1;

                return (
                    <Fragment key={segment}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {isLast ? (
                                <BreadcrumbPage>{segment}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    </Fragment>
                )
            })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default Breadcrumbs