import React from "react";
import * as _Builtin from "../devlink/_Builtin";
import * as _utils from "../devlink/utils";
import _styles from "../devlink/Toggle.module.css";
import { Link } from "react-router-dom";

export default function Toggle({ as: _Component = _Builtin.DropdownWrapper }) {
    return (
        <_Component tag="div" delay={0} hover={false}>
            <_Builtin.DropdownToggle
                className={_utils.cx(_styles, "toggle-style")}
                tag="div"
            >
                <_Builtin.Icon
                    widget={{
                        type: "icon",
                        icon: "dropdown-toggle",
                    }}
                />
                <_Builtin.Block tag="div">{"Dropdown"}</_Builtin.Block>
            </_Builtin.DropdownToggle>
            <_Builtin.DropdownList
                className={_utils.cx(_styles, "toggle-list")}
                tag="nav"
            >
                <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "dropdown-link")}
                    options={{
                        href: "#",
                    }}
                >
                    {"Link 1"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "dropdown-link")}
                    options={{
                        href: "#",
                    }}
                >
                    {"Link 2"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                    className={_utils.cx(_styles, "dropdown-link")}
                    Link={{
                        to: "checkout",
                    }}
                >
                    {"Link 3"}
                </_Builtin.DropdownLink>
            </_Builtin.DropdownList>
        </_Component>
    );
}
