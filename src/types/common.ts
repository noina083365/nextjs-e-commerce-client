import { alpha, styled, ThemeOptions, Toolbar } from "@mui/material";

type Id = 'id';
export type IdParams = Record<Id, string>;
export type Slug = 'slug';
export type SlugParams = Record<Slug, string>;

export type ParamProps = {
	params: Promise<IdParams>;
};

export type SlugProps = {
	params: Promise<SlugParams>;
};

export type SlugSearchProps = SlugProps & {
	searchParams: { [key: string]: string | string[] | undefined };
};

type ThemeVars = {
	vars: any;
}

export type ThemeToolbarOptions = Pick<ThemeOptions, 'shape' | 'palette'> & ThemeVars;

export const theme: ThemeToolbarOptions = {
	shape: {
		borderRadius: 8
	},
	palette: {
		divider: '2'
	},
	vars: {},
}

export const StyledToolbar = styled(Toolbar)((theme: ThemeToolbarOptions) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	flexShrink: 0,
	borderRadius: `calc(${theme.shape?.borderRadius}px + 8px)`,
	backdropFilter: 'blur(24px)',
	border: '1px solid',
	borderColor: (theme.vars || theme).palette?.divider,
	backgroundColor: theme.vars || 'grey'
		? `rgba(${theme.vars?.palette.background.defaultChannel} / 0.4)`
		: alpha(theme.palette?.background?.default || 'grey', 0.4),
	boxShadow: 'none',
	padding: '8px 12px',
}));