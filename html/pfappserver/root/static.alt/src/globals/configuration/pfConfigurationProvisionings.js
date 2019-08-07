import i18n from '@/utils/locale'
import pfFormChosen from '@/components/pfFormChosen'
import pfFormInput from '@/components/pfFormInput'
import pfFormPassword from '@/components/pfFormPassword'
import pfFormRangeToggle from '@/components/pfFormRangeToggle'
import pfFormTextarea from '@/components/pfFormTextarea'
import {
  pfConfigurationAttributesFromMeta,
  pfConfigurationValidatorsFromMeta
} from '@/globals/configuration/pfConfiguration'
import { pfSearchConditionType as conditionType } from '@/globals/pfSearch'
import {
  and,
  not,
  conditional,
  hasProvisionings,
  provisioningExists
} from '@/globals/pfValidators'

const {
  required
} = require('vuelidate/lib/validators')

export const pfConfigurationProvisioningsListColumns = [
  {
    key: 'id',
    label: i18n.t('Identifier'),
    required: true,
    sortable: true,
    visible: true
  },
  {
    key: 'description',
    label: i18n.t('Description'),
    sortable: true,
    visible: true
  },
  {
    key: 'type',
    label: i18n.t('Type'),
    sortable: true,
    visible: true
  },
  {
    key: 'buttons',
    label: '',
    locked: true
  }
]

export const pfConfigurationProvisioningsListFields = [
  {
    value: 'id',
    text: i18n.t('Identifier'),
    types: [conditionType.SUBSTRING]
  },
  {
    value: 'description',
    text: i18n.t('Description'),
    types: [conditionType.SUBSTRING]
  },
  {
    value: 'type',
    text: i18n.t('Type'),
    types: [conditionType.SUBSTRING]
  }
]

export const pfConfigurationProvisioningListConfig = (context = {}) => {
  return {
    columns: pfConfigurationProvisioningsListColumns,
    fields: pfConfigurationProvisioningsListFields,
    rowClickRoute (item, index) {
      return { name: 'provisioning', params: { id: item.id } }
    },
    searchPlaceholder: i18n.t('Search by id or description'),
    searchableOptions: {
      searchApiEndpoint: 'config/provisionings',
      defaultSortKeys: ['id'],
      defaultSearchCondition: {
        op: 'and',
        values: [{
          op: 'or',
          values: [
            { field: 'id', op: 'contains', value: null },
            { field: 'description', op: 'contains', value: null },
            { field: 'type', op: 'contains', value: null }
          ]
        }]
      },
      defaultRoute: { name: 'provisionings' }
    },
    searchableQuickCondition: (quickCondition) => {
      return {
        op: 'and',
        values: [{
          op: 'or',
          values: [
            { field: 'id', op: 'contains', value: quickCondition },
            { field: 'description', op: 'contains', value: quickCondition },
            { field: 'type', op: 'contains', value: quickCondition }
          ]
        }]
      }
    }
  }
}

export const pfConfigurationProvisioningFields = {
  id: ({ isNew = false, isClone = false, options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Provisioning ID'),
      fields: [
        {
          key: 'id',
          component: pfFormInput,
          attrs: {
            ...pfConfigurationAttributesFromMeta(meta, 'id'),
            ...{
              disabled: (!isNew && !isClone)
            }
          },
          validators: {
            ...pfConfigurationValidatorsFromMeta(meta, 'id', 'ID'),
            ...{
              [i18n.t('ID exists.')]: not(and(required, conditional(isNew || isClone), hasProvisionings, provisioningExists))
            }
          }
        }
      ]
    }
  },
  access_token: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Access token'),
      fields: [
        {
          key: 'access_token',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'access_token'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'access_token', i18n.t('Token'))
        }
      ]
    }
  },
  agent_download_uri: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Agent download URI'),
      fields: [
        {
          key: 'agent_download_uri',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'agent_download_uri'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'agent_download_uri', 'URI')
        }
      ]
    }
  },
  alt_agent_download_uri: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Alt agent download URI'),
      fields: [
        {
          key: 'alt_agent_download_uri',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'alt_agent_download_uri'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'alt_agent_download_uri', 'URI')
        }
      ]
    }
  },
  android_download_uri: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Android download URI'),
      fields: [
        {
          key: 'android_download_uri',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'android_download_uri'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'android_download_uri', 'URI')
        }
      ]
    }
  },
  api_password: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('API password'),
      fields: [
        {
          key: 'api_password',
          component: pfFormPassword,
          attrs: pfConfigurationAttributesFromMeta(meta, 'api_password'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'api_password', i18n.t('Password'))
        }
      ]
    }
  },
  api_username: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('API username'),
      fields: [
        {
          key: 'api_username',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'api_username'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'api_username', i18n.t('Username'))
        }
      ]
    }
  },
  api_uri: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Api uri'),
      fields: [
        {
          key: 'api_uri',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'api_uri'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'api_uri', 'URI')
        }
      ]
    }
  },
  boarding_host: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Boarding host'),
      fields: [
        {
          key: 'boarding_host',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'boarding_host'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'boarding_host', i18n.t('Host'))
        }
      ]
    }
  },
  boarding_port: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Boarding port'),
      fields: [
        {
          key: 'boarding_port',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'boarding_port'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'boarding_port', i18n.t('Port'))
        }
      ]
    }
  },
  broadcast: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Broadcast network'),
      text: i18n.t('Uncheck this box if you are using a hidden SSID.'),
      fields: [
        {
          key: 'broadcast',
          component: pfFormRangeToggle,
          attrs: {
            values: { checked: '1', unchecked: '0' }
          }
        }
      ]
    }
  },
  can_sign_profile: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Sign Profile'),
      fields: [
        {
          key: 'can_sign_profile',
          component: pfFormRangeToggle,
          attrs: {
            values: { checked: '1', unchecked: '0' }
          }
        }
      ]
    }
  },
  category: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Roles'),
      text: i18n.t('Nodes with the selected roles will be affected.'),
      fields: [
        {
          key: 'category',
          component: pfFormChosen,
          attrs: pfConfigurationAttributesFromMeta(meta, 'category'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'category', i18n.t('Roles'))
        }
      ]
    }
  },
  cert_chain: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('The certificate chain for the signer certificate'),
      text: i18n.t('The certificate chain of the signer certificate in PEM format.'),
      fields: [
        {
          key: 'cert_chain',
          component: pfFormTextarea,
          attrs: {
            ...pfConfigurationAttributesFromMeta(meta, 'cert_chain'),
            ...{
              rows: 5
            }
          },
          validators: pfConfigurationValidatorsFromMeta(meta, 'cert_chain', i18n.t('Chain'))
        }
      ]
    }
  },
  certificate: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('The certificate for signing profiles'),
      text: i18n.t('The certificate for signing in PEM format.'),
      fields: [
        {
          key: 'certificate',
          component: pfFormTextarea,
          attrs: {
            ...pfConfigurationAttributesFromMeta(meta, 'certificate'),
            ...{
              rows: 5
            }
          },
          validators: pfConfigurationValidatorsFromMeta(meta, 'certificate', i18n.t('Certificate'))
        }
      ]
    }
  },
  client_id: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Client Key'),
      fields: [
        {
          key: 'client_id',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'client_id'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'client_id', i18n.t('Key'))
        }
      ]
    }
  },
  client_secret: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Client Secret'),
      fields: [
        {
          key: 'client_secret',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'client_secret'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'client_secret', i18n.t('Secret'))
        }
      ]
    }
  },
  critical_issues_threshold: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Critical issues threshold'),
      text: i18n.t('The minimum number of critical issues a device needs to have before it gets isolated. 0 deactivates it.'),
      fields: [
        {
          key: 'critical_issues_threshold',
          component: pfFormInput,
          attrs: {
            ...pfConfigurationAttributesFromMeta(meta, 'critical_issues_threshold'),
            ...{
              type: 'number',
              step: 1
            }
          },
          validators: pfConfigurationValidatorsFromMeta(meta, 'critical_issues_threshold', i18n.t('Threshold'))
        }
      ]
    }
  },
  description: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Description'),
      fields: [
        {
          key: 'description',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'description'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'description', i18n.t('Description'))
        }
      ]
    }
  },
  device_type_detection: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Automatic device detection'),
      fields: [
        {
          key: 'device_type_detection',
          component: pfFormRangeToggle,
          attrs: {
            values: { checked: 'enabled', unchecked: 'disabled' }
          }
        }
      ]
    }
  },
  dpsk: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Enable DPSK'),
      text: i18n.t('Define if the PSK needs to be generated'),
      fields: [
        {
          key: 'dpsk',
          component: pfFormRangeToggle,
          attrs: {
            values: { checked: '1', unchecked: '0' }
          }
        }
      ]
    }
  },
  eap_type: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('EAP type'),
      text: i18n.t('Select the EAP type of your SSID. Leave empty for no EAP.'),
      fields: [
        {
          key: 'eap_type',
          component: pfFormChosen,
          attrs: pfConfigurationAttributesFromMeta(meta, 'eap_type'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'eap_type', i18n.t('Type'))
        }
      ]
    }
  },
  host: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Host'),
      fields: [
        {
          key: 'host',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'host'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'host', i18n.t('Host'))
        }
      ]
    }
  },
  ios_download_uri: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('IOS download URI'),
      fields: [
        {
          key: 'ios_download_uri',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'ios_download_uri'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'ios_download_uri', 'URI')
        }
      ]
    }
  },
  mac_osx_agent_download_uri: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Mac OSX agent download URI'),
      fields: [
        {
          key: 'mac_osx_agent_download_uri',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'mac_osx_agent_download_uri'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'mac_osx_agent_download_uri', 'URI')
        }
      ]
    }
  },
  non_compliance_security_event: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Non compliance security event'),
      text: i18n.t('Which security event should be raised when non compliance is detected.'),
      fields: [
        {
          key: 'non_compliance_security_event',
          component: pfFormChosen,
          attrs: pfConfigurationAttributesFromMeta(meta, 'non_compliance_security_event'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'non_compliance_security_event', i18n.t('Event'))
        }
      ]
    }
  },
  oses: ({ options: { meta = {} } } = {}) => {
    return {
      label: 'OS',
      text: i18n.t('Nodes with the selected OS will be affected.'),
      fields: [
        {
          key: 'oses',
          component: pfFormChosen,
          attrs: pfConfigurationAttributesFromMeta(meta, 'oses'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'oses', 'OS')
        }
      ]
    }
  },
  passcode: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Wifi Key'),
      fields: [
        {
          key: 'passcode',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'passcode'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'passcode', i18n.t('Key'))
        }
      ]
    }
  },
  password: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Client Secret'),
      fields: [
        {
          key: 'password',
          component: pfFormPassword,
          attrs: pfConfigurationAttributesFromMeta(meta, 'password'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'password', i18n.t('Secret'))
        }
      ]
    }
  },
  pki_provider: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('PKI Provider'),
      fields: [
        {
          key: 'pki_provider',
          component: pfFormChosen,
          attrs: pfConfigurationAttributesFromMeta(meta, 'pki_provider'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'pki_provider', i18n.t('Provider'))
        }
      ]
    }
  },
  port: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Port'),
      fields: [
        {
          key: 'port',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'port'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'port', i18n.t('Port'))
        }
      ]
    }
  },
  private_key: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('The private key for signing profiles'),
      text: i18n.t('The private key for signing in PEM format.'),
      fields: [
        {
          key: 'private_key',
          component: pfFormTextarea,
          attrs: {
            ...pfConfigurationAttributesFromMeta(meta, 'private_key'),
            ...{
              rows: 5
            }
          },
          validators: pfConfigurationValidatorsFromMeta(meta, 'private_key', i18n.t('Key'))
        }
      ]
    }
  },
  protocol: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Protocol'),
      fields: [
        {
          key: 'protocol',
          component: pfFormChosen,
          attrs: pfConfigurationAttributesFromMeta(meta, 'protocol'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'protocol', i18n.t('Protocol'))
        }
      ]
    }
  },
  psk_size: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('PSK length'),
      text: i18n.t('This is the length of the PSK key you want to generate. The minimum length is eight characters.'),
      fields: [
        {
          key: 'psk_size',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'psk_size'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'psk_size', i18n.t('Length'))
        }
      ]
    }
  },
  query_computers: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Query JAMF computers inventory'),
      fields: [
        {
          key: 'query_computers',
          component: pfFormRangeToggle,
          attrs: {
            values: { checked: 'enabled', unchecked: 'disabled' }
          }
        }
      ]
    }
  },
  query_mobiledevices: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Query JAMF mobile devices inventory'),
      fields: [
        {
          key: 'query_mobiledevices',
          component: pfFormRangeToggle,
          attrs: {
            values: { checked: 'enabled', unchecked: 'disabled' }
          }
        }
      ]
    }
  },
  refresh_token: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Refresh token'),
      fields: [
        {
          key: 'refresh_token',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'refresh_token'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'refresh_token', i18n.t('Token'))
        }
      ]
    }
  },
  security_type: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Security type'),
      text: i18n.t('Select the type of security applied for your SSID.'),
      fields: [
        {
          key: 'security_type',
          component: pfFormChosen,
          attrs: pfConfigurationAttributesFromMeta(meta, 'security_type'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'security_type', i18n.t('Type'))
        }
      ]
    }
  },
  server_certificate_path: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('RADIUS server certificate path'),
      text: i18n.t('The path to the RADIUS server certificate.'),
      fields: [
        {
          key: 'server_certificate_path',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'server_certificate_path'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'server_certificate_path', i18n.t('Path'))
        }
      ]
    }
  },
  ssid: ({ options: { meta = {} } } = {}) => {
    return {
      label: 'SSID',
      fields: [
        {
          key: 'ssid',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'ssid'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'ssid', 'SSID')
        }
      ]
    }
  },
  username: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Username'),
      fields: [
        {
          key: 'username',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'username'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'username', i18n.t('Username'))
        }
      ]
    }
  },
  win_agent_download_uri: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Windows agent download URI'),
      fields: [
        {
          key: 'win_agent_download_uri',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'win_agent_download_uri'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'win_agent_download_uri', 'URI')
        }
      ]
    }
  },
  windows_phone_download_uri: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Windows phone download URI'),
      fields: [
        {
          key: 'windows_phone_download_uri',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'windows_phone_download_uri'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'windows_phone_download_uri', 'URI')
        }
      ]
    }
  },
  table_for_mac: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('MAC table name'),
      fields: [
        {
          key: 'table_for_mac',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'table_for_mac'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'table_for_mac', i18n.t('Mac table name'))
        }
      ]
    }
  },
  table_for_agent: ({ options: { meta = {} } } = {}) => {
    return {
      label: i18n.t('Agent table name'),
      fields: [
        {
          key: 'table_for_agent',
          component: pfFormInput,
          attrs: pfConfigurationAttributesFromMeta(meta, 'table_for_agent'),
          validators: pfConfigurationValidatorsFromMeta(meta, 'table_for_agent', i18n.t('Agent table name'))
        }
      ]
    }
  }
}

export const pfConfigurationProvisioningViewFields = (context) => {
  const { provisioningType = null, form = {} } = context
  switch (provisioningType) {
    case 'accept':
      return [
        {
          tab: null, // ignore tabs
          fields: [
            pfConfigurationProvisioningFields.id(context),
            pfConfigurationProvisioningFields.description(context),
            pfConfigurationProvisioningFields.category(context),
            pfConfigurationProvisioningFields.oses(context)
          ]
        }
      ]
    case 'android':
      return [
        {
          tab: null, // ignore tabs
          fields: [
            ...[
              pfConfigurationProvisioningFields.id(context),
              pfConfigurationProvisioningFields.description(context),
              pfConfigurationProvisioningFields.category(context),
              pfConfigurationProvisioningFields.ssid(context),
              pfConfigurationProvisioningFields.broadcast(context),
              pfConfigurationProvisioningFields.security_type(context)
            ],
            ...((form.security_type === 'WPA2')
              ? [
                pfConfigurationProvisioningFields.eap_type(context)
              ]
              : [] // ignore
            ),
            ...((['WEP', 'WPA'].includes(form.security_type) || (form.security_type === 'WPA2' && !form.eap_type))
              ? [
                pfConfigurationProvisioningFields.dpsk(context),
                pfConfigurationProvisioningFields.passcode(context)
              ]
              : [] // ignore
            ),
            ...((form.security_type === 'WPA2' && ~~form.eap_type === 25 /* PEAP */)
              ? [
                pfConfigurationProvisioningFields.server_certificate_path(context)
              ]
              : [] // ignore
            ),
            ...((form.security_type === 'WPA2' && ~~form.eap_type === 13 /* EAP-TLS */)
              ? [
                pfConfigurationProvisioningFields.pki_provider(context)
              ]
              : [] // ignore
            )
          ]
        }
      ]
    case 'deny':
      return [
        {
          tab: null, // ignore tabs
          fields: [
            pfConfigurationProvisioningFields.id(context),
            pfConfigurationProvisioningFields.description(context),
            pfConfigurationProvisioningFields.category(context),
            pfConfigurationProvisioningFields.oses(context)
          ]
        }
      ]
    case 'dpsk':
      return [
        {
          tab: null, // ignore tabs
          fields: [
            pfConfigurationProvisioningFields.id(context),
            pfConfigurationProvisioningFields.description(context),
            pfConfigurationProvisioningFields.category(context),
            pfConfigurationProvisioningFields.ssid(context),
            pfConfigurationProvisioningFields.oses(context),
            pfConfigurationProvisioningFields.psk_size(context)
          ]
        }
      ]
    case 'ibm':
      return [
        {
          tab: null, // ignore tabs
          fields: [
            pfConfigurationProvisioningFields.id(context),
            pfConfigurationProvisioningFields.description(context),
            pfConfigurationProvisioningFields.category(context),
            pfConfigurationProvisioningFields.username(context),
            pfConfigurationProvisioningFields.password(context),
            pfConfigurationProvisioningFields.host(context),
            pfConfigurationProvisioningFields.port(context),
            pfConfigurationProvisioningFields.protocol(context),
            pfConfigurationProvisioningFields.api_uri(context),
            pfConfigurationProvisioningFields.oses(context),
            pfConfigurationProvisioningFields.agent_download_uri(context)
          ]
        }
      ]
    case 'jamf':
      return [
        {
          tab: null, // ignore tabs
          fields: [
            pfConfigurationProvisioningFields.id(context),
            pfConfigurationProvisioningFields.description(context),
            pfConfigurationProvisioningFields.category(context),
            pfConfigurationProvisioningFields.oses(context),
            pfConfigurationProvisioningFields.host(context),
            pfConfigurationProvisioningFields.port(context),
            pfConfigurationProvisioningFields.protocol(context),
            pfConfigurationProvisioningFields.api_username(context),
            pfConfigurationProvisioningFields.api_password(context),
            pfConfigurationProvisioningFields.device_type_detection(context),
            pfConfigurationProvisioningFields.query_computers(context),
            pfConfigurationProvisioningFields.query_mobiledevices(context)
          ]
        }
      ]
    case 'mobileconfig':
      return [
        {
          tab: i18n.t('Settings'),
          fields: [
            ...[
              pfConfigurationProvisioningFields.id(context),
              pfConfigurationProvisioningFields.description(context),
              pfConfigurationProvisioningFields.category(context),
              pfConfigurationProvisioningFields.ssid(context),
              pfConfigurationProvisioningFields.broadcast(context),
              pfConfigurationProvisioningFields.security_type(context)
            ],
            ...((form.security_type === 'WPA2')
              ? [
                pfConfigurationProvisioningFields.eap_type(context)
              ]
              : [] // ignore
            ),
            ...((['WEP', 'WPA'].includes(form.security_type) || (form.security_type === 'WPA2' && !form.eap_type))
              ? [
                pfConfigurationProvisioningFields.dpsk(context),
                pfConfigurationProvisioningFields.passcode(context)
              ]
              : [] // ignore
            ),
            ...((form.security_type === 'WPA2' && ~~form.eap_type === 25 /* PEAP */)
              ? [
                pfConfigurationProvisioningFields.server_certificate_path(context)
              ]
              : [] // ignore
            ),
            ...((form.security_type === 'WPA2' && ~~form.eap_type === 13 /* EAP-TLS */)
              ? [
                pfConfigurationProvisioningFields.pki_provider(context)
              ]
              : [] // ignore
            )
          ]
        },
        {
          tab: i18n.t('Signing'),
          fields: [
            pfConfigurationProvisioningFields.can_sign_profile(context),
            pfConfigurationProvisioningFields.certificate(context),
            pfConfigurationProvisioningFields.private_key(context),
            pfConfigurationProvisioningFields.cert_chain(context)
          ]
        }
      ]
    case 'mobileiron':
      return [
        {
          tab: null, // ignore tabs
          fields: [
            pfConfigurationProvisioningFields.id(context),
            pfConfigurationProvisioningFields.description(context),
            pfConfigurationProvisioningFields.category(context),
            pfConfigurationProvisioningFields.oses(context),
            pfConfigurationProvisioningFields.username(context),
            pfConfigurationProvisioningFields.password(context),
            pfConfigurationProvisioningFields.host(context),
            pfConfigurationProvisioningFields.android_download_uri(context),
            pfConfigurationProvisioningFields.ios_download_uri(context),
            pfConfigurationProvisioningFields.windows_phone_download_uri(context),
            pfConfigurationProvisioningFields.boarding_host(context),
            pfConfigurationProvisioningFields.boarding_port(context)
          ]
        }
      ]
    case 'opswat':
      return [
        {
          tab: i18n.t('Settings'),
          fields: [
            pfConfigurationProvisioningFields.id(context),
            pfConfigurationProvisioningFields.description(context),
            pfConfigurationProvisioningFields.category(context),
            pfConfigurationProvisioningFields.oses(context),
            pfConfigurationProvisioningFields.client_id(context),
            pfConfigurationProvisioningFields.client_secret(context),
            pfConfigurationProvisioningFields.host(context),
            pfConfigurationProvisioningFields.port(context),
            pfConfigurationProvisioningFields.protocol(context),
            pfConfigurationProvisioningFields.access_token(context),
            pfConfigurationProvisioningFields.refresh_token(context),
            pfConfigurationProvisioningFields.agent_download_uri(context)
          ]
        },
        {
          tab: i18n.t('Compliance'),
          fields: [
            pfConfigurationProvisioningFields.non_compliance_security_event(context),
            pfConfigurationProvisioningFields.critical_issues_threshold(context)
          ]
        }
      ]
    case 'sentinelone':
      return [
        {
          tab: null, // ignore tabs
          fields: [
            pfConfigurationProvisioningFields.id(context),
            pfConfigurationProvisioningFields.description(context),
            pfConfigurationProvisioningFields.category(context),
            pfConfigurationProvisioningFields.oses(context),
            pfConfigurationProvisioningFields.host(context),
            pfConfigurationProvisioningFields.port(context),
            pfConfigurationProvisioningFields.protocol(context),
            pfConfigurationProvisioningFields.api_username(context),
            pfConfigurationProvisioningFields.api_password(context),
            pfConfigurationProvisioningFields.win_agent_download_uri(context),
            pfConfigurationProvisioningFields.mac_osx_agent_download_uri(context)
          ]
        }
      ]
    case 'sepm':
      return [
        {
          tab: null, // ignore tabs
          fields: [
            pfConfigurationProvisioningFields.id(context),
            pfConfigurationProvisioningFields.description(context),
            pfConfigurationProvisioningFields.category(context),
            pfConfigurationProvisioningFields.oses(context),
            pfConfigurationProvisioningFields.client_id(context),
            pfConfigurationProvisioningFields.client_secret(context),
            pfConfigurationProvisioningFields.host(context),
            pfConfigurationProvisioningFields.port(context),
            pfConfigurationProvisioningFields.protocol(context),
            pfConfigurationProvisioningFields.access_token(context),
            pfConfigurationProvisioningFields.refresh_token(context),
            pfConfigurationProvisioningFields.agent_download_uri(context),
            pfConfigurationProvisioningFields.alt_agent_download_uri(context)
          ]
        }
      ]
    case 'symantec':
      return [
        {
          tab: null, // ignore tabs
          fields: [
            pfConfigurationProvisioningFields.id(context),
            pfConfigurationProvisioningFields.description(context),
            pfConfigurationProvisioningFields.category(context),
            pfConfigurationProvisioningFields.oses(context),
            pfConfigurationProvisioningFields.username(context),
            pfConfigurationProvisioningFields.password(context),
            pfConfigurationProvisioningFields.host(context),
            pfConfigurationProvisioningFields.port(context),
            pfConfigurationProvisioningFields.protocol(context),
            pfConfigurationProvisioningFields.api_uri(context),
            pfConfigurationProvisioningFields.agent_download_uri(context)
          ]
        }
      ]
    case 'servicenow':
      return [
        {
          tab: null, // ignore tabs
          fields: [
            pfConfigurationProvisioningFields.id(context),
            pfConfigurationProvisioningFields.description(context),
            pfConfigurationProvisioningFields.category(context),
            pfConfigurationProvisioningFields.oses(context),
            pfConfigurationProvisioningFields.username(context),
            pfConfigurationProvisioningFields.password(context),
            pfConfigurationProvisioningFields.host(context),
            pfConfigurationProvisioningFields.protocol(context),
            pfConfigurationProvisioningFields.table_for_mac(context),
            pfConfigurationProvisioningFields.table_for_agent(context),
          ]
        }
      ]
    case 'windows':
      return [
        {
          tab: null, // ignore tabs
          fields: [
            ...[
              pfConfigurationProvisioningFields.id(context),
              pfConfigurationProvisioningFields.description(context),
              pfConfigurationProvisioningFields.category(context),
              pfConfigurationProvisioningFields.ssid(context),
              pfConfigurationProvisioningFields.broadcast(context),
              pfConfigurationProvisioningFields.security_type(context)
            ],
            ...((form.security_type === 'WPA2')
              ? [
                pfConfigurationProvisioningFields.eap_type(context)
              ]
              : [] // ignore
            ),
            ...((['WEP', 'WPA'].includes(form.security_type) || (form.security_type === 'WPA2' && !form.eap_type))
              ? [
                pfConfigurationProvisioningFields.dpsk(context),
                pfConfigurationProvisioningFields.passcode(context)
              ]
              : [] // ignore
            ),
            ...((form.security_type === 'WPA2' && ~~form.eap_type === 25 /* PEAP */)
              ? [
                pfConfigurationProvisioningFields.server_certificate_path(context)
              ]
              : [] // ignore
            ),
            ...((form.security_type === 'WPA2' && ~~form.eap_type === 13 /* EAP-TLS */)
              ? [
                pfConfigurationProvisioningFields.pki_provider(context)
              ]
              : [] // ignore
            )
          ]
        }
      ]
    default:
      return [
        {
          tab: null, // ignore tabs
          fields: []
        }
      ]
  }
}
