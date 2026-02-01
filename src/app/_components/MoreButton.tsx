"use client";
import { useDialog } from "@/hooks/useDialog";
import { PATH } from "@/lib/constant/paths";
import { CodeData } from "@/lib/types/CodeDataModel";
import {
  Bookmark,
  BookmarkBorder,
  Delete,
  Edit,
  Link,
  MoreVert,
} from "@mui/icons-material";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import { MouseEventHandler, useState } from "react";
import DeleteDialogContent from "./DeleteDialog";
import DevelopmentComponent from "@/components/DevelopmentComponent";
import { useBookmark } from "@/hooks/useBookmark";

type MoreButtonProps = {
  id: CodeData["id"];
};

function MoreButton({ id }: MoreButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { openDialog } = useDialog();
  const { isBookmarked, toggleBookmark } = useBookmark(id);

  const handleOpen: MouseEventHandler<HTMLButtonElement> = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLinkCopy = async () => {
    const url = window.location.origin + PATH.DETAIL(id);
    await navigator.clipboard.writeText(url);
    handleClose();
  };

  const handleDelete = () => {
    openDialog(<DeleteDialogContent id={id} />);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVert />
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}>
        <nav>
          <List>
            <DevelopmentComponent>
              <ListItem disablePadding>
                <ListItemButton href={PATH.EDIT(id)}>
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText primary="編集する" />
                </ListItemButton>
              </ListItem>
            </DevelopmentComponent>

            <ListItem disablePadding>
              <ListItemButton onClick={toggleBookmark}>
                <ListItemIcon>
                  {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
                </ListItemIcon>
                <ListItemText
                  primary={`ブックマーク${isBookmarked ? "をはずす" : "する"}`}
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={handleLinkCopy}>
                <ListItemIcon>
                  <Link />
                </ListItemIcon>
                <ListItemText primary="リンクをコピー" />
              </ListItemButton>
            </ListItem>
          </List>

          <DevelopmentComponent>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleDelete}>
                  <ListItemIcon>
                    <Delete />
                  </ListItemIcon>
                  <ListItemText primary="削除する" />
                </ListItemButton>
              </ListItem>
            </List>
          </DevelopmentComponent>
        </nav>
      </Popover>
    </>
  );
}

export default MoreButton;
