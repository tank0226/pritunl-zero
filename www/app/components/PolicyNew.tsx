/// <reference path="../References.d.ts"/>
import * as React from 'react';
import * as PolicyTypes from '../types/PolicyTypes';
import * as ServiceTypes from '../types/ServiceTypes';
import * as AuthorityTypes from '../types/AuthorityTypes';
import * as SettingsTypes from '../types/SettingsTypes';
import * as PolicyActions from '../actions/PolicyActions';
import ServicesStore from '../stores/ServicesStore';
import AuthoritiesStore from '../stores/AuthoritiesStore';
import PolicyRule from './PolicyRule';
import PageInput from './PageInput';
import PageSwitch from './PageSwitch';
import PageSelect from './PageSelect';
import PageSelectButton from './PageSelectButton';
import PageInputButton from './PageInputButton';
import PageInfo from './PageInfo';
import PageCreate from './PageCreate';
import ConfirmButton from './ConfirmButton';
import Help from './Help';
import * as Alert from '../Alert';

interface Props {
	services: ServiceTypes.ServicesRo;
	authorities: AuthorityTypes.AuthoritiesRo;
	providers: SettingsTypes.SecondaryProviders;
	onClose: () => void;
}

interface State {
	closed: boolean;
	disabled: boolean;
	changed: boolean;
	message: string;
	policy: PolicyTypes.Policy;
	addService: string;
	addAuthority: string;
	addRole: string;
}

const css = {
	row: {
		display: 'table-row',
		width: '100%',
		padding: 0,
		boxShadow: 'none',
		position: 'relative',
	} as React.CSSProperties,
	card: {
		position: 'relative',
		padding: '10px 10px 0 10px',
		width: '100%',
	} as React.CSSProperties,
	remove: {
		position: 'absolute',
		top: '5px',
		right: '5px',
	} as React.CSSProperties,
	item: {
		margin: '9px 5px 0 5px',
		height: '20px',
	} as React.CSSProperties,
	itemsLabel: {
		display: 'block',
	} as React.CSSProperties,
	itemsAdd: {
		margin: '8px 0 15px 0',
	} as React.CSSProperties,
	group: {
		flex: 1,
		minWidth: '250px',
	} as React.CSSProperties,
	save: {
		paddingBottom: '10px',
	} as React.CSSProperties,
	label: {
		width: '100%',
		maxWidth: '280px',
	} as React.CSSProperties,
	inputGroup: {
		width: '100%',
	} as React.CSSProperties,
	protocol: {
		flex: '0 1 auto',
	} as React.CSSProperties,
	port: {
		flex: '1',
	} as React.CSSProperties,
	button: {
		height: '30px',
	} as React.CSSProperties,
	buttons: {
		position: 'absolute',
		top: '5px',
		right: '5px',
	} as React.CSSProperties,
	select: {
		margin: '7px 0px 0px 6px',
		paddingTop: '3px',
	} as React.CSSProperties,
};

export default class PolicyDetailed extends React.Component<Props, State> {
	constructor(props: any, context: any) {
		super(props, context);
		this.state = {
			closed: false,
			disabled: false,
			changed: false,
			message: '',
			addService: null,
			addAuthority: null,
			addRole: null,
			policy: {
				name: 'New Policy',
			},
		};
	}

	set(name: string, val: any): void {
		let policy: any = {
			...this.state.policy,
		};

		policy[name] = val;

		this.setState({
			...this.state,
			changed: true,
			policy: policy,
		});
	}

	setRule(name: string, rule: PolicyTypes.Rule): void {
		let policy: PolicyTypes.Policy;

		policy = {
			...this.state.policy,
		};

		let rules = {
			...(policy.rules || {}),
		};

		if (rule.values == null) {
			delete rules[name];
		} else {
			rules[name] = rule;
		}

		policy.rules = rules;

		this.setState({
			...this.state,
			changed: true,
			policy: policy,
		});
	}

	onCreate = (): void => {
		this.setState({
			...this.state,
			disabled: true,
		});

		let policy: any = {
			...this.state.policy,
		};

		PolicyActions.create(policy).then((): void => {
			this.setState({
				...this.state,
				message: 'Policy created successfully',
				changed: false,
			});

			setTimeout((): void => {
				this.setState({
					...this.state,
					disabled: false,
					changed: true,
				});
			}, 2000);
		}).catch((): void => {
			this.setState({
				...this.state,
				message: '',
				disabled: false,
			});
		});
	}

	onAddService = (): void => {
		let policy: PolicyTypes.Policy;

		policy = {
			...this.state.policy,
		};

		if (!this.state.addService && !this.props.services.length) {
			return;
		}

		let serviceId = this.state.addService || this.props.services[0].id;

		let services = [
			...(policy.services || []),
		];

		if (services.indexOf(serviceId) === -1) {
			services.push(serviceId);
		}

		services.sort();

		policy.services = services;

		this.setState({
			...this.state,
			changed: true,
			policy: policy,
		});
	}

	onRemoveService = (service: string): void => {
		let policy: PolicyTypes.Policy;

		policy = {
			...this.state.policy,
		};

		let services = [
			...(policy.services || []),
		];

		let i = services.indexOf(service);
		if (i === -1) {
			return;
		}

		services.splice(i, 1);

		policy.services = services;

		this.setState({
			...this.state,
			changed: true,
			policy: policy,
		});
	}

	onAddAuthority = (): void => {
		let policy: PolicyTypes.Policy;

		policy = {
			...this.state.policy,
		};

		if (!this.state.addAuthority && !this.props.authorities.length) {
			return;
		}

		let authorityId = this.state.addAuthority ||
			this.props.authorities[0].id;

		let authorities = [
			...(policy.authorities || []),
		];

		if (authorities.indexOf(authorityId) === -1) {
			authorities.push(authorityId);
		}

		authorities.sort();

		policy.authorities = authorities;

		this.setState({
			...this.state,
			changed: true,
			policy: policy,
		});
	}

	onRemoveAuthority = (authority: string): void => {
		let policy: PolicyTypes.Policy;

		policy = {
			...this.state.policy,
		};

		let authorities = [
			...(policy.authorities || []),
		];

		let i = authorities.indexOf(authority);
		if (i === -1) {
			return;
		}

		authorities.splice(i, 1);

		policy.authorities = authorities;

		this.setState({
			...this.state,
			changed: true,
			policy: policy,
		});
	}

	onAddRole = (): void => {
		let policy: PolicyTypes.Policy;

		policy = {
			...this.state.policy,
		};

		let roles = [
			...(policy.roles || []),
		];

		if (!this.state.addRole) {
			return;
		}

		if (roles.indexOf(this.state.addRole) === -1) {
			roles.push(this.state.addRole);
		}

		roles.sort();

		policy.roles = roles;

		this.setState({
			...this.state,
			changed: true,
			message: '',
			addRole: '',
			policy: policy,
		});
	}

	onRemoveRole(role: string): void {
		let policy: PolicyTypes.Policy;

		policy = {
			...this.state.policy,
		};

		let roles = [
			...(policy.roles || []),
		];

		let i = roles.indexOf(role);
		if (i === -1) {
			return;
		}

		roles.splice(i, 1);

		policy.roles = roles;

		this.setState({
			...this.state,
			changed: true,
			message: '',
			addRole: '',
			policy: policy,
		});
	}

	render(): JSX.Element {
		let policy: PolicyTypes.Policy = this.state.policy;

		let services: JSX.Element[] = [];
		for (let serviceId of policy.services || []) {
			let service = ServicesStore.serviceName(serviceId);
			if (!service) {
				continue;
			}

			services.push(
				<div
					className="bp5-tag bp5-tag-removable bp5-intent-primary"
					style={css.item}
					key={service.id}
				>
					{service.name}
					<button
						className="bp5-tag-remove"
						onMouseUp={(): void => {
							this.onRemoveService(service.id);
						}}
					/>
				</div>,
			);
		}

		let servicesSelect: JSX.Element[] = [];
		if (this.props.services.length) {
			for (let service of this.props.services) {
				servicesSelect.push(
					<option
						key={service.id}
						value={service.id}
					>{service.name}</option>,
				);
			}
		} else {
			servicesSelect.push(<option key="null" value="">None</option>);
		}

		let authorities: JSX.Element[] = [];
		for (let authorityId of policy.authorities || []) {
			let authority = AuthoritiesStore.authority(authorityId);
			if (!authority) {
				continue;
			}

			authorities.push(
				<div
					className="bp5-tag bp5-tag-removable bp5-intent-primary"
					style={css.item}
					key={authority.id}
				>
					{authority.name}
					<button
						className="bp5-tag-remove"
						onMouseUp={(): void => {
							this.onRemoveAuthority(authority.id);
						}}
					/>
				</div>,
			);
		}

		let authoritiesSelect: JSX.Element[] = [];
		if (this.props.authorities.length) {
			for (let authority of this.props.authorities) {
				authoritiesSelect.push(
					<option
						key={authority.id}
						value={authority.id}
					>{authority.name}</option>,
				);
			}
		} else {
			authoritiesSelect.push(<option key="null" value="">None</option>);
		}

		let roles: JSX.Element[] = [];
		for (let role of policy.roles || []) {
			roles.push(
				<div
					className="bp5-tag bp5-tag-removable bp5-intent-primary"
					style={css.item}
					key={role}
				>
					{role}
					<button
						className="bp5-tag-remove"
						onMouseUp={(): void => {
							this.onRemoveRole(role);
						}}
					/>
				</div>,
			);
		}

		let operatingSystem = policy.rules?.operating_system || {
			type: 'operating_system',
		};
		let browser = policy.rules?.browser || {
			type: 'browser',
		};
		let location = policy.rules?.location || {
			type: 'location',
		};
		let whitelistNetworks = policy.rules?.whitelist_networks || {
			type: 'whitelist_networks',
		};
		let blacklistNetworks = policy.rules?.blacklist_networks || {
			type: 'blacklist_networks',
		};

		let providerIds: string[] = [];
		let adminProviders: JSX.Element[] = [];
		let userProviders: JSX.Element[] = [];
		let proxyProviders: JSX.Element[] = [];
		let authorityProviders: JSX.Element[] = [];
		if (this.props.providers.length) {
			for (let provider of this.props.providers) {
				providerIds.push(provider.id);
				adminProviders.push(<option
					key={provider.id}
					value={provider.id}
				>{provider.name}</option>);
				userProviders.push(<option
					key={provider.id}
					value={provider.id}
				>{provider.name}</option>);
				proxyProviders.push(<option
					key={provider.id}
					value={provider.id}
				>{provider.name}</option>);
				authorityProviders.push(<option
					key={provider.id}
					value={provider.id}
				>{provider.name}</option>);
			}
		} else {
			adminProviders.push(<option
				key="null"
				value=""
			>None</option>);
			userProviders.push(<option
				key="null"
				value=""
			>None</option>);
			proxyProviders.push(<option
				key="null"
				value=""
			>None</option>);
			authorityProviders.push(<option
				key="null"
				value=""
			>None</option>);
		}
		let adminProvider = policy.admin_secondary &&
			providerIds.indexOf(policy.admin_secondary) !== -1;
		let userProvider = policy.user_secondary &&
			providerIds.indexOf(policy.user_secondary) !== -1;
		let proxyProvider = policy.proxy_secondary &&
			providerIds.indexOf(policy.proxy_secondary) !== -1;
		let authorityProvider = policy.authority_secondary &&
			providerIds.indexOf(policy.authority_secondary) !== -1;

		return <div
			className="bp5-card bp5-row"
			style={css.row}
		>
			<td
				className="bp5-cell"
				colSpan={2}
				style={css.card}
			>
				<div className="layout horizontal wrap">
					<div style={css.group}>
						<div style={css.buttons}>
						</div>
						<PageInput
							label="Name"
							help="Name of policy"
							type="text"
							placeholder="Enter name"
							value={policy.name}
							onChange={(val): void => {
								this.set('name', val);
							}}
						/>
						<label className="bp5-label">
							Roles
							<Help
								title="Roles"
								content="Roles associated with this policy. All requests from users with associated roles must pass this policy check."
							/>
							<div>
								{roles}
							</div>
						</label>
						<PageInputButton
							buttonClass="bp5-intent-success bp5-icon-add"
							label="Add"
							type="text"
							placeholder="Add role"
							value={this.state.addRole}
							onChange={(val): void => {
								this.setState({
									...this.state,
									addRole: val,
								});
							}}
							onSubmit={this.onAddRole}
						/>
						<label
							className="bp5-label"
							style={css.label}
						>
							Services
							<Help
								title="Services"
								content="Services associated with this policy. All requests to the associated services must pass this policy check."
							/>
							<div>
								{services}
							</div>
						</label>
						<PageSelectButton
							label="Add Service"
							value={this.state.addService}
							disabled={!this.props.services.length}
							buttonClass="bp5-intent-success"
							onChange={(val: string): void => {
								this.setState({
									...this.state,
									addService: val,
								});
							}}
							onSubmit={this.onAddService}
						>
							{servicesSelect}
						</PageSelectButton>
						<label
							className="bp5-label"
							style={css.label}
						>
							Authorities
							<Help
								title="Authorities"
								content="Authorities associated with this policy. All certificate requests to the associated authority must pass this policy check."
							/>
							<div>
								{authorities}
							</div>
						</label>
						<PageSelectButton
							label="Add Authority"
							value={this.state.addAuthority}
							disabled={!this.props.authorities.length}
							buttonClass="bp5-intent-success"
							onChange={(val: string): void => {
								this.setState({
									...this.state,
									addAuthority: val,
								});
							}}
							onSubmit={this.onAddAuthority}
						>
							{authoritiesSelect}
						</PageSelectButton>
						<PageSwitch
							label="Admin two-factor authentication"
							help="Require admins to use two-factor authentication."
							checked={adminProvider}
							onToggle={(): void => {
								if (adminProvider) {
									this.set('admin_secondary', null);
								} else {
									if (this.props.providers.length === 0) {
										Alert.warning(
											'No two-factor authentication providers exist');
										return;
									}
									this.set('admin_secondary', this.props.providers[0].id);
								}
							}}
						/>
						<PageSelect
							disabled={this.state.disabled}
							label="Admin Two-Factor Provider"
							help="Two-factor authentication provider that will be used. For users matching multiple policies the first provider will be used."
							hidden={!adminProvider}
							value={policy.admin_secondary}
							onChange={(val): void => {
								this.set('admin_secondary', val);
							}}
						>
							{adminProviders}
						</PageSelect>
						<PageSwitch
							label="User two-factor authentication"
							help="Require users to use two-factor authentication."
							checked={userProvider}
							onToggle={(): void => {
								if (userProvider) {
									this.set('user_secondary', null);
								} else {
									if (this.props.providers.length === 0) {
										Alert.warning(
											'No two-factor authentication providers exist');
										return;
									}
									this.set('user_secondary', this.props.providers[0].id);
								}
							}}
						/>
						<PageSelect
							disabled={this.state.disabled}
							label="User Two-Factor Provider"
							help="Two-factor authentication provider that will be used. For users matching multiple policies the first provider will be used."
							hidden={!userProvider}
							value={policy.user_secondary}
							onChange={(val): void => {
								this.set('user_secondary', val);
							}}
						>
							{userProviders}
						</PageSelect>
						<PageSwitch
							label="Service two-factor authentication"
							help="Require service users to use two-factor authentication."
							checked={proxyProvider}
							onToggle={(): void => {
								if (proxyProvider) {
									this.set('proxy_secondary', null);
								} else {
									if (this.props.providers.length === 0) {
										Alert.warning(
											'No two-factor authentication providers exist');
										return;
									}
									this.set('proxy_secondary', this.props.providers[0].id);
								}
							}}
						/>
						<PageSelect
							disabled={this.state.disabled}
							label="Service Two-Factor Provider"
							help="Two-factor authentication provider that will be used. For users matching multiple policies the first provider will be used."
							hidden={!proxyProvider}
							value={policy.proxy_secondary}
							onChange={(val): void => {
								this.set('proxy_secondary', val);
							}}
						>
							{proxyProviders}
						</PageSelect>
						<PageSwitch
							label="Authority two-factor authentication"
							help="Require users retrieving SSH certificates from an authority to use two-factor authentication."
							checked={authorityProvider}
							onToggle={(): void => {
								if (authorityProvider) {
									this.set('authority_secondary', null);
								} else {
									if (this.props.providers.length === 0) {
										Alert.warning(
											'No two-factor authentication providers exist');
										return;
									}
									this.set('authority_secondary', this.props.providers[0].id);
								}
							}}
						/>
						<PageSelect
							disabled={this.state.disabled}
							label="Authority Two-Factor Provider"
							help="Two-factor authentication provider that will be used. For users matching multiple policies the first provider will be used."
							hidden={!authorityProvider}
							value={policy.authority_secondary}
							onChange={(val): void => {
								this.set('authority_secondary', val);
							}}
						>
							{authorityProviders}
						</PageSelect>
					</div>
					<div style={css.group}>
						<PageSwitch
							label="Enabled"
							help="Enable or disable policy."
							checked={!policy.disabled}
							onToggle={(): void => {
								this.set('disabled', !policy.disabled)
							}}
						/>
						<PolicyRule
							rule={whitelistNetworks}
							onChange={(val): void => {
								this.setRule('whitelist_networks', val);
							}}
						/>
						<PolicyRule
							rule={blacklistNetworks}
							onChange={(val): void => {
								this.setRule('blacklist_networks', val);
							}}
						/>
						<PolicyRule
							rule={location}
							onChange={(val): void => {
								this.setRule('location', val);
							}}
						/>
						<PolicyRule
							rule={operatingSystem}
							onChange={(val): void => {
								this.setRule('operating_system', val);
							}}
						/>
						<PolicyRule
							rule={browser}
							onChange={(val): void => {
								this.setRule('browser', val);
							}}
						/>
						<PageSwitch
							label="Admin WebAuthn device authentication"
							help="Require admins to use WebAuthn device authentication."
							checked={policy.admin_device_secondary}
							onToggle={(): void => {
								this.set('admin_device_secondary',
									!policy.admin_device_secondary)
							}}
						/>
						<PageSwitch
							label="User WebAuthn device authentication"
							help="Require users to use WebAuthn device authentication."
							checked={policy.user_device_secondary}
							onToggle={(): void => {
								this.set('user_device_secondary',
									!policy.user_device_secondary)
							}}
						/>
						<PageSwitch
							label="Service WebAuthn device authentication"
							help="Require service users to use WebAuthn device authentication."
							checked={policy.proxy_device_secondary}
							onToggle={(): void => {
								this.set('proxy_device_secondary',
									!policy.proxy_device_secondary)
							}}
						/>
						<PageSwitch
							label="Authority WebAuthn device authentication"
							help="Require users retrieving SSH certificates from an authority to use WebAuthn device authentication."
							checked={policy.authority_device_secondary}
							onToggle={(): void => {
								this.set('authority_device_secondary',
									!policy.authority_device_secondary)
							}}
						/>
						<PageSwitch
							label="Authority require Smart Card"
							help="Require users retrieving SSH certificates to use a Smart Card."
							checked={policy.authority_require_smart_card}
							onToggle={(): void => {
								this.set('authority_require_smart_card',
									!policy.authority_require_smart_card)
							}}
						/>
					</div>
				</div>
				<PageCreate
					style={css.save}
					hidden={!this.state.policy}
					message={this.state.message}
					changed={this.state.changed}
					disabled={this.state.disabled}
					closed={this.state.closed}
					light={true}
					onCancel={this.props.onClose}
					onCreate={this.onCreate}
				/>
			</td>
		</div>;
	}
}
