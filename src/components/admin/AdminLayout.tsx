import { useSidebar } from '@/contexts/SidebarContext';
import { AdminLayoutProps } from '@/types/interfaces';
import Link from 'next/link';

export default function AdminLayout({ children }: AdminLayoutProps) {
	const { isSidebarOpen, toggleSidebar } = useSidebar();

	return (
		<div className="admin-layout">
			<aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
				<div className="toggle-area">
					<button className="toggle-sidebar" onClick={toggleSidebar}>
						<svg
							className='collapse-control'
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 10 6">
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m1 1 4 4 4-4"
							/>
						</svg>
					</button>
					<ul className="space-y-2 font-medium">
						<li>
							<Link
								href="/admin">
								<svg
									className="admin-menu-sidebar-icon"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 22 21">
									<path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
									<path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
								</svg>
								<span className={`${isSidebarOpen ? '' : 'hidden'}`}>Dashboard</span>
							</Link>
						</li>
						<li>
							<Link href="#">
								<svg
									className="admin-menu-sidebar-icon"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 18 18">
									<path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
								</svg>
								<span className={`${isSidebarOpen ? '' : 'hidden'}`}>Categories</span>
							</Link>
						</li>
						<li>
							<Link href="/admin/product">
								<svg
									className="admin-menu-sidebar-icon"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 18 20">
									<path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
								</svg>
								<span className={`${isSidebarOpen ? '' : 'hidden'}`}>Products</span>
							</Link>
						</li>
						<li>
							<Link href="#">
								<svg
									className="admin-menu-sidebar-icon"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									width="24" height="24"
									fill="none"
									viewBox="0 0 24 24">
									<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2" />
								</svg>
								<span className={`${isSidebarOpen ? '' : 'hidden'}`}>Orders</span>
							</Link>
						</li>
						<li>
							<Link href="#">
								<svg
									className="admin-menu-sidebar-icon"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 18">
									<path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
								</svg>
								<span className={`${isSidebarOpen ? '' : 'hidden'}`}>Users</span>
							</Link>
						</li>
						<li>
							<Link href="#">
								<svg className="admin-menu-sidebar-icon" 
								aria-hidden="true" 
								xmlns="http://www.w3.org/2000/svg" 
								fill="currentColor" 
								viewBox="0 0 24 24">
									<path fillRule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clipRule="evenodd" />
								</svg>
								<span className={`${isSidebarOpen ? '' : 'hidden'}`}>Customers</span>
							</Link>
						</li>
					</ul>
				</div>
			</aside>

			<main className="main-content">{children}</main>

			<style jsx>{`
				.sidebar {
					width: ${isSidebarOpen ? '200px' : '60px'};
				}
				.sidebar svg.collapse-control {
					transform: ${isSidebarOpen ? 'rotate(90deg)' : 'rotate(-90deg)'};
				}
			`}</style>
		</div>
	);
}
