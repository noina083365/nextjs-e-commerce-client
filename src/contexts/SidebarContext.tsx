import { SidebarContextType, LayoutItemProviderProps } from '@/types/interfaces';
import { createContext, useState, useContext } from 'react';

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: LayoutItemProviderProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

	return (
		<SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>{children}</SidebarContext.Provider>
	);
}

export function useSidebar() {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error('useSidebar must be used within a SidebarProvider');
	}
	return context;
}
