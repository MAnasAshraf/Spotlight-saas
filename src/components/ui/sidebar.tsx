
"use client";
import { cn } from "@/lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Layers } from "lucide-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
  active?: boolean; 
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden md:flex md:flex-col bg-sidebar border-r border-sidebar-border w-[260px] shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "260px" : "70px") : "260px",
        }}
        onMouseEnter={!animate ? undefined : () => setOpen(true)}
        onMouseLeave={!animate ? undefined : () => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-sidebar border-b border-sidebar-border w-full"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <IconMenu2
            className="text-sidebar-foreground"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-sidebar p-10 z-[100] flex flex-col justify-between border-r border-sidebar-border",
                className
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-sidebar-foreground"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  active,
  onClick,
}: {
  link: Links;
  className?: string;
  active?: boolean;
  onClick?: () => void;
}) => {
  const { open, animate } = useSidebar();
  return (
    <a
      href={link.href}
      onClick={onClick}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-1.5 px-2 rounded-lg transition-colors duration-150 ease-in-out cursor-pointer",
        !active && "hover:bg-sidebar-accent",
        className
      )}
    >
      <div
        className={cn(
          "p-2 rounded-md flex items-center justify-center transition-colors duration-150 ease-in-out",
          active
            ? "iconBackground" 
            : "bg-transparent"
        )}
      >
        {React.cloneElement(link.icon as React.ReactElement, {
          className: cn(
            (link.icon as React.ReactElement).props.className,
            "h-5 w-5 shrink-0 transition-colors duration-150 ease-in-out",
            active
              ? "text-foreground" 
              : "text-neutral-400 group-hover/sidebar:text-sidebar-accent-foreground"
          ),
        })}
      </div>
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className={cn(
          "text-sm transition-all duration-150 ease-in-out whitespace-pre inline-block !p-0 !m-0",
          active
            ? "text-foreground font-medium" 
            : "text-neutral-400 group-hover/sidebar:text-sidebar-accent-foreground"
        )}
      >
        {link.label}
      </motion.span>
    </a>
  );
};


export const Logo = () => {
  const { open } = useSidebar();
  return (
    <div
      className={cn(
        "relative z-20 flex items-center py-1 text-sm font-normal",
         open ? "space-x-2" : "justify-center"
      )}
    >
      <Layers size={24} className="text-sidebar-foreground" />
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="font-medium whitespace-pre text-sidebar-foreground text-lg"
          >
            Auto-Webinar
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export const LogoIcon = () => {
  return (
     <div className="relative z-20 flex items-center justify-center py-1 text-sm font-normal text-sidebar-foreground">
      <Layers size={24} className="text-sidebar-foreground"/>
    </div>
  );
};

