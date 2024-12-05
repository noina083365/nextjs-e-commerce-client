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
