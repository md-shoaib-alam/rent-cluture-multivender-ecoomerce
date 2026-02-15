"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export function VendorSidebar({
    open,
    setOpen
}: {
    open?: boolean;
    setOpen?: (open: boolean) => void;
}) {
    const pathname = usePathname();
    const { data: session } = useSession();

    const isActive = (path: string) => pathname === path;

    return (
        <aside className={cn(
            "fixed lg:relative z-50 lg:z-0 w-64 h-screen bg-slate-950 border-r border-slate-800 flex flex-col transform transition-transform duration-300",
            open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}>
            <div className="p-6 flex items-center gap-3">
                <div className="size-10 rounded-lg bg-primary flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">apparel</span>
                </div>
                <div>
                    <h1 className="font-bold text-lg leading-none text-white">Rent Culture</h1>
                    <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Seller Hub</p>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
                <NavItem href="/dashboard/vendor" icon="dashboard" label="Dashboard" active={isActive("/dashboard/vendor")} onClick={() => setOpen?.(false)} />
                <NavItem href="/dashboard/vendor/products" icon="inventory_2" label="My Listings" active={pathname?.startsWith("/dashboard/vendor/products")} onClick={() => setOpen?.(false)} />
                <NavItem href="/dashboard/vendor/orders" icon="shopping_bag" label="Orders" active={isActive("/dashboard/vendor/orders")} onClick={() => setOpen?.(false)} />
                <NavItem href="/dashboard/vendor/earnings" icon="payments" label="Earnings" active={isActive("/dashboard/vendor/earnings")} onClick={() => setOpen?.(false)} />
                <NavItem href="/dashboard/vendor/analytics" icon="analytics" label="Analytics" active={isActive("/dashboard/vendor/analytics")} onClick={() => setOpen?.(false)} />

                <div className="pt-4 pb-2">
                    <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Account</p>
                </div>

                <NavItem href="/dashboard/vendor/kyc" icon="verified_user" label="KYC & Agreement" active={isActive("/dashboard/vendor/kyc")} onClick={() => setOpen?.(false)} />
                <NavItem href="/dashboard/vendor/settings" icon="settings" label="Settings" active={isActive("/dashboard/vendor/settings")} onClick={() => setOpen?.(false)} />
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="bg-slate-900/50 p-3 rounded-xl mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800">
                            {session?.user?.image ? (
                                <img className="w-full h-full object-cover" src={session.user.image} alt="User" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary text-white font-bold text-xs">
                                    {session?.user?.name?.[0] || "V"}
                                </div>
                            )}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-white truncate">{session?.user?.name || "Vendor"}</p>
                        </div>
                    </div>
                </div>

                <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-3 px-3 py-2.5 text-red-400 hover:bg-red-500/10 rounded-lg w-full transition-colors">
                    <span className="material-symbols-outlined">logout</span>
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}

function NavItem({ href, icon, label, active, onClick }: { href: string; icon: string; label: string; active?: boolean; onClick?: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                active
                    ? "bg-primary text-white shadow-lg shadow-primary/20 font-semibold"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
        >
            <span className="material-symbols-outlined">{icon}</span>
            <span className="text-sm">{label}</span>
        </Link>
    );
}
